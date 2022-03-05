from http.client import NO_CONTENT, HTTPResponse
from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, Response
from models import EntryModel, UpdateEntryModel

router = APIRouter()

@router.get("/", response_description="Test call")
async def get():
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get("/api/", response_description="List all games")
async def get_games(request: Request):
    games_first = []
    docs = request.app.mongodb["Games"].find()
    for doc in await request.app.mongodb["Games"].find().to_list(length=10000):
        games_first.append(doc)
    games = sorted(games_first, key=lambda x: x['creation_time'])
    games.reverse()
    return games


@router.get("/api/{id}", response_description="Get one game")
async def get_one_game(id: str, request: Request):
    game = await request.app.mongodb["Games"].find_one({"_id": id})
    return game

@router.post("/api/", response_description="Log a new game")
async def post_game(request: Request, game: EntryModel = Body(...)):
    game = jsonable_encoder(game)
    new_game = await request.app.mongodb["Games"].insert_one(game)
    created_game = await request.app.mongodb["Games"].find_one(
        {"_id": new_game.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_game)


@router.put("/api/{id}", response_description="Update an existing game")
async def put_game(id: str, request: Request, game: UpdateEntryModel = Body(...)):
    game = {k: v for k, v in game.dict().items() if v is not None}
    if len(game) >= 1:
        update_result = await request.app.mongodb["Games"].update_one(
            {"_id": id}, {"$set": game}
        )
    if update_result.modified_count == 1:
        if (
            updated_game := await request.app.mongodb["Games"].find_one({"_id": id})
        ) is not None:
            return updated_game
    if (
        existing_game := await request.app.mongodb["Games"].find_one({"_id": id})
    ) is not None:
        return existing_game

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.delete("/api/{id}", response_description="Delete an unwanted game")
async def delete_game(id: str, request: Request, response: Response):
    delete_result = await request.app.mongodb["Games"].delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

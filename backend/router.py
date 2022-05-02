from argparse import Namespace
from http.client import NO_CONTENT, HTTPResponse
from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, Response
from models import *

router = APIRouter()

@router.get("/", response_description="Test call")
async def get():
    return {"status":"functional"}

# CRUDding questions

@router.get("/api/categories/", response_description="List all questions")
async def get_questions(request: Request):
    questions = list()
    for doc in await request.app.mongodb["Questions"].find().to_list(length=10000):
        questions.append(doc)
    categories = list(set([question["category"] for question in questions]))
    return categories

@router.get("/api/questions/", response_description="List all questions")
async def get_questions(request: Request):
    questions = list()
    for doc in await request.app.mongodb["Questions"].find().to_list(length=10000):
        questions.append(doc)
    return questions

@router.get("/api/questions/{category}", response_description="Get all questions of a category")
async def get_questions(request: Request, category: str):
    questions = list()
    for doc in await request.app.mongodb["Questions"].find().to_list(length=10000):
        if doc["category"] == category:
            questions.append(doc)
    return questions


@router.get("/api/questions/byId/{id}", response_description="Get one question")
async def get_one_question(id: str, request: Request):
    question = await request.app.mongodb["Questions"].find_one({"_id": id})
    return question

@router.post("/api/questions/", response_description="Log a new question")
async def post_question(request: Request, question: QuestionModel = Body(...)):
    question = jsonable_encoder(question)
    new_question = await request.app.mongodb["Questions"].insert_one(question)
    created_question = await request.app.mongodb["Questions"].find_one(
        {"_id": new_question.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_question)


@router.put("/api/questions/{id}", response_description="Update an existing question")
async def put_question(id: str, request: Request, question: UpdateQuestionModel = Body(...)):
    question = {k: v for k, v in question.dict().items() if v is not None}
    if len(question) >= 1:
        update_result = await request.app.mongodb["Questions"].update_one(
            {"_id": id}, {"$set": question}
        )
    if update_result.modified_count == 1:
        if (
            updated_question := await request.app.mongodb["Questions"].find_one({"_id": id})
        ) is not None:
            return updated_question
    if (
        existing_question := await request.app.mongodb["Questions"].find_one({"_id": id})
    ) is not None:
        return existing_question

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.delete("/api/questions/{id}", response_description="Delete an unwanted question")
async def delete_question(id: str, request: Request, response: Response):
    delete_result = await request.app.mongodb["Questions"].delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

# CRUDding games

@router.get("/api/links/", response_description="List all links")
async def get_games(request: Request):
    links = dict()
    for doc in await request.app.mongodb["Games"].find().to_list(length=10000):
        links[doc["_id"]] = doc["questions"]
    return links

@router.get("/api/games/", response_description="List all links")
async def get_games(request: Request):
    games = list()
    for doc in await request.app.mongodb["Games"].find().to_list(length=10000):
        games.append(doc)
    return games

@router.get("/api/games/{id}", response_description="List one game")
async def get_games(id : str, request: Request):
    game = await request.app.mongodb["Games"].find_one({"_id": id})
    return game

@router.post("/api/games/", response_description="Create a game")
async def post_question(request: Request, game: GameModel = Body(...)):
    game = jsonable_encoder(game)
    new_game = await request.app.mongodb["Games"].insert_one(game)
    created_game = await request.app.mongodb["Games"].find_one(
        {"_id": new_game.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_game)


@router.put("/api/games/{id}", response_description="Update an existing game")
async def put_game(id: str, request: Request, game: UpdateGameModel = Body(...)):
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

    raise HTTPException(status_code=404, detail=f"Game {id} not found")


@router.delete("/api/games/{id}", response_description="Delete an unwanted game")
async def delete_question(id: str, request: Request, response: Response):
    delete_result = await request.app.mongodb["Games"].delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

# CRUDding players

@router.get("/api/players/", response_description="List all links")
async def get_games(request: Request):
    links = dict()
    for doc in await request.app.mongodb["Players"].find().to_list(length=10000):
        links[doc["_id"]] = doc["questions"]
    return links

@router.get("/api/players/", response_description="List all players")
async def get_games(request: Request):
    players = list()
    for doc in await request.app.mongodb["Players"].find().to_list(length=10000):
        players.append(doc)
    return players

@router.get("/api/players/{id}", response_description="List one player")
async def get_games(id : str, request: Request):
    game = await request.app.mongodb["Players"].find_one({"_id": id})
    return game

@router.post("/api/players/", response_description="Create a player")
async def post_question(request: Request, player: PlayerModel = Body(...)):
    player = jsonable_encoder(player)
    names = list()
    for doc in await request.app.mongodb["Players"].find().to_list(length=10000):
        names.append(doc["_id"])
    if player["_id"] in names:
        return {"ErrorValue":"Name already created"}
    new_player = await request.app.mongodb["Players"].insert_one(player)
    created_player = await request.app.mongodb["Players"].find_one(
        {"_id": new_player.inserted_id}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_player)

@router.put("/api/players/{id}", response_description="Update an existing player")
async def put_game(id: str, request: Request, player: UpdatePlayerModel = Body(...)):
    player = {k: v for k, v in player.dict().items() if v is not None}
    if len(player) >= 1:
        update_result = await request.app.mongodb["Players"].update_one(
            {"_id": id}, {"$set": player}
        )
    if update_result.modified_count == 1:
        if (
            updated_player := await request.app.mongodb["Players"].find_one({"_id": id})
        ) is not None:
            return updated_player
    if (
        existing_player := await request.app.mongodb["Players"].find_one({"_id": id})
    ) is not None:
        return existing_player

    raise HTTPException(status_code=404, detail=f"Player {id} not found")


@router.delete("/api/players/{id}", response_description="Delete an unwanted player")
async def delete_question(id: str, request: Request, response: Response):
    delete_result = await request.app.mongodb["Players"].delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
import uuid
from datetime import datetime
from typing import Optional
import random
import string
from pydantic import BaseModel, Field


class QuestionModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    answer: str = Field(...)
    responses: list = Field(...)
    category: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name":"What isn't 1+1?",
                "answer":"Fish",
                "responses":["2", "Window", "Fish", "3-1"],
                "category":"Math"
            }
    }


class UpdateQuestionModel(BaseModel):
    name: str = Field(...)
    answer: str = Field(...)
    responses: list = Field(...)
    category: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name":"What isn't 1+1?",
                "answer":"Too",
                "responses":["Two", "Window", "1+1", "Too"],
                "category":"Math"
            }
    }

def makeLink():
    letters = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters) for i in range(7))

class GameModel(BaseModel):
    id: str = Field(default_factory=makeLink, alias="_id")
    expiryTime: int = Field(...)
    questions: list = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id":"xG7xvlI",
                "expiryTime":1521462189,
                "questions":[{
                    "name":"What isn't 1+1?",
                    "answer":"Too",
                    "responses":["Two", "Window", "1+1", "Too"],
                    "category":"Math"
                }]

            }
    }


class UpdateGameModel(BaseModel):
    expiryTime: int = Field(...)
    questions: list = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "expiryTime":1321462189,
                "questions":[{
                    "name":"What isn't 1+3?",
                    "answer":"For",
                    "responses":["Four", "4", "3+1", "For"],
                    "category":"Math"
                }]

            }
    }

class PlayerModel(BaseModel):
    id: str = Field(..., alias="_id")
    score: int = Field(...)
    total: int = Field(...)
    game: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id":"Winner",
                "score":24,
                "total":30,
                "game":"abc1234"
            }
    }


class UpdatePlayerModel(BaseModel):
    score: int = Field(...)
    total: int = Field(...)
    game: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "score":22,
                "total":24,
                "game":"abc1233"
            }
    }
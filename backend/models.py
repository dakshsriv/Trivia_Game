import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class GameModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    questions: dict = Field(...)
    answers: dict = Field(...)
    creation_time: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "questions" : {"00094907-0406-0607-0e4f-0a0b0c0d0e0f" : {"value":"What is the capital of Canada", "TimeAllowed":"10", "responses":["Ottawa", "Montreal", "Ontario", "Toronto"]}},
                "answers" : {"00010203-0405-0607-0809-0a0b0c0d0e0f":"Ottawa"},
                "creation_time": "2022-02-06"
            }
    }


class UpdateGameModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    questions: dict = Field(...)
    answers: dict = Field(...)
    creation_time: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "questions" : {"00094907-0406-0607-0e4f-0a0b0c0d0e0f" : {"value":"What is the capital of Canada", "TimeAllowed":"10", "responses":["Ottawa", "Montreal", "Ontario", "Toronto"]}},
                "answers" : {"00010203-0405-0607-0809-0a0b0c0d0e0f":"Ottawa"},
                "creation_time": "2022-02-06"
            }
    }
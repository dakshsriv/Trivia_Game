import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class QuestionModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    answer: str = Field(...)
    responses: list = Field(...)
    timer: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name":"What isn't 1+1?",
                "answer":"Fish",
                "responses":["2", "Window", "Fish", "3-1"]
            }
    }


class UpdateQuestionModel(BaseModel):
    name: str = Field(...)
    answer: str = Field(...)
    responses: list = Field(...)
    timer: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name":"What isn't 1+1?",
                "answer":"0+1",
                "responses":["Two", "Window", "1+1", "Too"]
            }
    }
from pydantic import BaseSettings


class CommonSettings:
    APP_NAME: str = "Trivia Game"
    DEBUG_MODE: bool = True


class DatabaseSettings:
    DB_URL: str = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    DB_NAME: str = "TriviaGame"


class ServerSettings:
    HOST: str = "127.0.0.1"
    PORT: int = 8000


class Settings(CommonSettings, DatabaseSettings, ServerSettings):
    pass

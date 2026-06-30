from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    PROJECT_NAME: str

    model_config = SettingsConfigDict(
        env_file=str(
            Path(__file__).resolve().parents[2] / ".env"
        ),
        extra="ignore",
    )


settings = Settings()
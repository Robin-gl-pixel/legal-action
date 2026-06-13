from pydantic_settings import BaseSettings, SettingsConfigDict


class WorkersSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    hatchet_client_token: str = ""
    app_env: str = "development"
    log_level: str = "info"


def get_settings() -> WorkersSettings:
    return WorkersSettings()

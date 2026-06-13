from fastapi import APIRouter
from pydantic import BaseModel

from legal_action_api import __version__


class HealthResponse(BaseModel):
    status: str
    version: str


router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["health"])
async def get_health() -> HealthResponse:
    return HealthResponse(status="ok", version=__version__)

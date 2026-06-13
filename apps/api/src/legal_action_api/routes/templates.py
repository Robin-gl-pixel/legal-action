from __future__ import annotations

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, ConfigDict

from legal_action_api.templates.errors import TemplateInvalide, TemplateRenderError
from legal_action_api.templates.loader import TEMPLATES_DIR, charger_template
from legal_action_api.templates.renderer import render_template


class RenderTemplateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slots: dict[str, str]


class RenderTemplateResponse(BaseModel):
    template_id: str
    version: str
    sections: dict[str, str]


router = APIRouter(prefix="/templates", tags=["templates"])


@router.post(
    "/{template_id}/render",
    response_model=RenderTemplateResponse,
    status_code=status.HTTP_200_OK,
)
async def render_template_endpoint(
    template_id: str, payload: RenderTemplateRequest
) -> RenderTemplateResponse:
    template_path = TEMPLATES_DIR / f"{template_id}.yaml"
    if not template_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"template '{template_id}' inconnu",
        )

    try:
        template = charger_template(template_path)
    except TemplateInvalide as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc

    try:
        sections = render_template(template, payload.slots)
    except TemplateRenderError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=str(exc),
        ) from exc

    return RenderTemplateResponse(
        template_id=template.id,
        version=template.version,
        sections=sections,
    )

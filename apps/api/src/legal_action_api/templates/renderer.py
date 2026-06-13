from __future__ import annotations

import re

from legal_action_api.templates.errors import TemplateRenderError
from legal_action_api.templates.loader import Template

_SLOT_RE = re.compile(r"\{\{\s*(?P<name>[a-z_][a-z0-9_]*)\s*\}\}")


def render_template(template: Template, slots: dict[str, str]) -> dict[str, str]:
    manquants = [name for name in template.slots_requis if name not in slots]
    if manquants:
        raise TemplateRenderError(
            f"slots manquants pour template '{template.id}': {sorted(manquants)}"
        )

    rendered: dict[str, str] = {}
    for nom_section, contenu in template.sections.items():
        rendered[nom_section] = _substitute(contenu, slots, template.id, nom_section)
    return rendered


def _substitute(contenu: str, slots: dict[str, str], template_id: str, nom_section: str) -> str:
    def _replace(match: re.Match[str]) -> str:
        nom = match.group("name")
        if nom not in slots:
            raise TemplateRenderError(
                f"slot '{nom}' utilise dans section '{nom_section}' du template "
                f"'{template_id}' mais non fourni"
            )
        return slots[nom]

    return _SLOT_RE.sub(_replace, contenu)

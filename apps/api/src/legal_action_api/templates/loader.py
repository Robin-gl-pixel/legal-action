from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml
from pydantic import BaseModel, ConfigDict, Field, field_validator

from legal_action_api.domaine.enums import CasType, Operateur
from legal_action_api.templates.errors import SectionFigeeAvecSlot, TemplateInvalide

TEMPLATES_DIR: Path = Path(__file__).resolve().parents[3] / "templates"

_FRONTMATTER_RE = re.compile(r"^---\s*\n(?P<fm>.*?)\n---\s*\n(?P<body>.*)\Z", re.DOTALL)
_SECTION_HEADER_RE = re.compile(r"^@section\s+(?P<name>[a-z_][a-z0-9_]*)\s*$")
_SLOT_RE = re.compile(r"\{\{\s*([a-z_][a-z0-9_]*)\s*\}\}")
_SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
_ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


class Template(BaseModel):
    model_config = ConfigDict(frozen=True, extra="forbid")

    id: str
    vertical: str
    cas_type: CasType
    operateur: Operateur
    fondement: str
    avocat_validateur: str
    version: str
    delai_jours: int = Field(gt=0)
    slots_requis: list[str]
    sections_figees: list[str]
    sections: dict[str, str]

    @field_validator("id")
    @classmethod
    def _validate_id(cls, value: str) -> str:
        if not _ID_RE.match(value):
            raise ValueError("id must be kebab-case")
        return value

    @field_validator("version")
    @classmethod
    def _validate_version(cls, value: str) -> str:
        if not _SEMVER_RE.match(value):
            raise ValueError("version must be semver MAJOR.MINOR.PATCH")
        return value


def _parse_sections(body: str) -> dict[str, str]:
    lines = body.splitlines()
    sections: dict[str, list[str]] = {}
    current: str | None = None
    preamble_seen = False

    for raw_line in lines:
        match = _SECTION_HEADER_RE.match(raw_line)
        if match:
            name = match.group("name")
            if name in sections:
                raise TemplateInvalide(f"duplicate section '{name}'")
            sections[name] = []
            current = name
            continue
        if current is None:
            if raw_line.strip():
                preamble_seen = True
            continue
        sections[current].append(raw_line)

    if preamble_seen:
        raise TemplateInvalide("content found before first @section header")
    if not sections:
        raise TemplateInvalide("no @section header found in template body")

    return {name: "\n".join(content).strip("\n") for name, content in sections.items()}


def _ensure_sections_figees_sans_slot(sections: dict[str, str], sections_figees: list[str]) -> None:
    for figee in sections_figees:
        if figee not in sections:
            raise TemplateInvalide(f"section_figee '{figee}' absente du corps")
        if _SLOT_RE.search(sections[figee]):
            raise SectionFigeeAvecSlot(
                f"section figee '{figee}' contient un slot, interdit par ADR-003"
            )


def charger_template(path: Path) -> Template:
    if not path.exists():
        raise TemplateInvalide(f"template file not found: {path}")

    raw = path.read_text(encoding="utf-8")
    match = _FRONTMATTER_RE.match(raw)
    if match is None:
        raise TemplateInvalide(f"missing or malformed YAML frontmatter in {path}")

    try:
        frontmatter_data: Any = yaml.safe_load(match.group("fm"))
    except yaml.YAMLError as exc:
        raise TemplateInvalide(f"invalid YAML frontmatter in {path}: {exc}") from exc

    if not isinstance(frontmatter_data, dict):
        raise TemplateInvalide(f"frontmatter must be a mapping in {path}")

    body = match.group("body")
    sections = _parse_sections(body)

    try:
        template = Template(**frontmatter_data, sections=sections)
    except ValueError as exc:
        raise TemplateInvalide(f"invalid template frontmatter in {path}: {exc}") from exc

    _ensure_sections_figees_sans_slot(template.sections, template.sections_figees)

    return template


def lister_templates(directory: Path | None = None) -> list[Template]:
    base = directory if directory is not None else TEMPLATES_DIR
    if not base.exists():
        return []
    return [charger_template(p) for p in sorted(base.glob("*.yaml"))]

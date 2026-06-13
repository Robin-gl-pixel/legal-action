from pathlib import Path

import pytest

from legal_action_api.domaine.enums import CasType, Operateur
from legal_action_api.templates.errors import SectionFigeeAvecSlot, TemplateInvalide
from legal_action_api.templates.loader import (
    TEMPLATES_DIR,
    charger_template,
    lister_templates,
)

TEMPLATE_RESILIATION_FREE = TEMPLATES_DIR / "resiliation-refusee-free-v1.yaml"


def test_charge_template_resiliation_refusee_free() -> None:
    template = charger_template(TEMPLATE_RESILIATION_FREE)

    assert template.id == "resiliation-refusee-free-v1"
    assert template.cas_type is CasType.RESILIATION_REFUSEE
    assert template.operateur is Operateur.FREE
    assert template.version == "1.0.0"
    assert template.delai_jours == 15
    assert "fondement" in template.sections_figees
    assert "formule_fin" in template.sections_figees


def test_template_sections_attendues_presentes() -> None:
    template = charger_template(TEMPLATE_RESILIATION_FREE)

    for section in ("objet", "faits", "fondement", "pretentions", "formule_fin"):
        assert section in template.sections, f"section manquante: {section}"
        assert template.sections[section].strip() != ""


def test_slots_requis_apparaissent_bien_dans_le_corps() -> None:
    template = charger_template(TEMPLATE_RESILIATION_FREE)
    corps = "\n".join(template.sections.values())

    for slot in template.slots_requis:
        assert f"{{{{{slot}}}}}" in corps, f"slot non utilise dans le corps: {slot}"


def test_lister_templates_renvoie_au_moins_le_premier() -> None:
    templates = lister_templates()
    ids = {t.id for t in templates}
    assert "resiliation-refusee-free-v1" in ids


def test_frontmatter_manquant_leve_template_invalide(tmp_path: Path) -> None:
    bad = tmp_path / "broken.yaml"
    bad.write_text("@section objet\nbonjour\n", encoding="utf-8")

    with pytest.raises(TemplateInvalide):
        charger_template(bad)


def test_section_figee_avec_slot_est_refusee(tmp_path: Path) -> None:
    contenu = (
        "---\n"
        "id: cas-test-v1\n"
        "vertical: telecom\n"
        "cas_type: resiliation_refusee\n"
        "operateur: free\n"
        "fondement: test\n"
        "avocat_validateur: test\n"
        "version: 1.0.0\n"
        "delai_jours: 15\n"
        "slots_requis: [faits]\n"
        "sections_figees: [fondement]\n"
        "---\n"
        "@section faits\n"
        "{{faits}}\n"
        "@section fondement\n"
        "Article {{slot_interdit}}.\n"
    )
    bad = tmp_path / "bad.yaml"
    bad.write_text(contenu, encoding="utf-8")

    with pytest.raises(SectionFigeeAvecSlot):
        charger_template(bad)


def test_id_non_kebab_case_est_refuse(tmp_path: Path) -> None:
    contenu = (
        "---\n"
        "id: CasInvalide_v1\n"
        "vertical: telecom\n"
        "cas_type: resiliation_refusee\n"
        "operateur: free\n"
        "fondement: test\n"
        "avocat_validateur: test\n"
        "version: 1.0.0\n"
        "delai_jours: 15\n"
        "slots_requis: []\n"
        "sections_figees: []\n"
        "---\n"
        "@section objet\n"
        "x\n"
    )
    bad = tmp_path / "bad.yaml"
    bad.write_text(contenu, encoding="utf-8")

    with pytest.raises(TemplateInvalide):
        charger_template(bad)

import re

import pytest
from syrupy.assertion import SnapshotAssertion

from legal_action_api.templates.errors import TemplateRenderError
from legal_action_api.templates.loader import (
    TEMPLATES_DIR,
    charger_template,
    lister_templates,
)
from legal_action_api.templates.renderer import render_template

_SLOT_RE = re.compile(r"\{\{\s*[a-z_][a-z0-9_]*\s*\}\}")


SLOTS_RESILIATION_FREE: dict[str, str] = {
    "identite_expediteur": "Jeanne Dupont",
    "adresse_expediteur": "12 rue de la Paix, 75002 Paris",
    "reference_contrat": "FR-123456789",
    "date_demande_resiliation": "3 mars 2026",
    "canal_demande_resiliation": "courrier recommande",
    "faits_narration": (
        "Le courrier a ete depose au bureau de poste de Paris 02 et receptionne "
        "le 6 mars 2026 selon le suivi La Poste. Aucune confirmation de "
        "resiliation ne m'a ete adressee depuis cette date."
    ),
    "montants_contestes": "47,98 euros",
    "pretentions_action": (
        "prendre acte de la resiliation au 6 mars 2026, cesser tout prelevement "
        "ulterieur et procéder au remboursement des sommes prelevees depuis "
        "cette date."
    ),
}


def test_rendu_resiliation_free_snapshot(snapshot: SnapshotAssertion) -> None:
    template = charger_template(TEMPLATES_DIR / "resiliation-refusee-free-v1.yaml")

    rendered = render_template(template, SLOTS_RESILIATION_FREE)

    assert rendered == snapshot


def test_rendu_ne_laisse_aucun_slot_non_substitue() -> None:
    template = charger_template(TEMPLATES_DIR / "resiliation-refusee-free-v1.yaml")

    rendered = render_template(template, SLOTS_RESILIATION_FREE)

    for nom_section, contenu in rendered.items():
        assert not _SLOT_RE.search(contenu), f"slot non substitue dans section '{nom_section}'"


def test_garde_fou_sections_figees_pour_tous_les_templates() -> None:
    templates = lister_templates()
    assert templates, "aucun template trouve dans apps/api/templates/"

    for template in templates:
        for figee in template.sections_figees:
            contenu = template.sections[figee]
            assert not _SLOT_RE.search(contenu), (
                f"template '{template.id}' section figee '{figee}' contient un slot"
            )


def test_slot_manquant_leve_render_error() -> None:
    template = charger_template(TEMPLATES_DIR / "resiliation-refusee-free-v1.yaml")
    slots_incomplets = dict(SLOTS_RESILIATION_FREE)
    del slots_incomplets["faits_narration"]

    with pytest.raises(TemplateRenderError):
        render_template(template, slots_incomplets)


def test_posture_editoriale_pas_de_conseil_personnalise() -> None:
    template = charger_template(TEMPLATES_DIR / "resiliation-refusee-free-v1.yaml")
    corps = "\n".join(template.sections.values()).lower()

    expressions_interdites = [
        "je vous recommande",
        "vous gagnerez",
        "dans votre cas vous devriez",
        "dans votre cas, vous devriez",
    ]
    for expression in expressions_interdites:
        assert expression not in corps, (
            f"posture editoriale violee: '{expression}' present dans le template"
        )

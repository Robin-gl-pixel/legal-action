from httpx import AsyncClient

SLOTS_OK: dict[str, str] = {
    "identite_expediteur": "Jeanne Dupont",
    "adresse_expediteur": "12 rue de la Paix, 75002 Paris",
    "reference_contrat": "FR-123456789",
    "date_demande_resiliation": "3 mars 2026",
    "canal_demande_resiliation": "courrier recommande",
    "faits_narration": "Aucune confirmation de resiliation recue.",
    "montants_contestes": "47,98 euros",
    "pretentions_action": "prendre acte de la resiliation au 6 mars 2026.",
}


async def test_render_endpoint_renvoie_sections(client: AsyncClient) -> None:
    response = await client.post(
        "/templates/resiliation-refusee-free-v1/render",
        json={"slots": SLOTS_OK},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["template_id"] == "resiliation-refusee-free-v1"
    assert payload["version"] == "1.0.0"
    sections = payload["sections"]
    for nom_section in ("objet", "faits", "fondement", "pretentions", "formule_fin"):
        assert nom_section in sections
    assert "Jeanne Dupont" in sections["objet"]


async def test_render_endpoint_template_inconnu_404(client: AsyncClient) -> None:
    response = await client.post(
        "/templates/template-qui-nexiste-pas-v1/render",
        json={"slots": {}},
    )

    assert response.status_code == 404


async def test_render_endpoint_slot_manquant_422(client: AsyncClient) -> None:
    slots_incomplets = dict(SLOTS_OK)
    del slots_incomplets["faits_narration"]

    response = await client.post(
        "/templates/resiliation-refusee-free-v1/render",
        json={"slots": slots_incomplets},
    )

    assert response.status_code == 422


async def test_render_endpoint_payload_invalide_422(client: AsyncClient) -> None:
    response = await client.post(
        "/templates/resiliation-refusee-free-v1/render",
        json={"slot": {}},
    )

    assert response.status_code == 422

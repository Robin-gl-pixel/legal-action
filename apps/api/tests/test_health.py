from httpx import AsyncClient

from legal_action_api import __version__


async def test_health_returns_ok_and_version(client: AsyncClient) -> None:
    response = await client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload == {"status": "ok", "version": __version__}


async def test_health_response_is_json(client: AsyncClient) -> None:
    response = await client.get("/health")

    assert response.headers["content-type"].startswith("application/json")

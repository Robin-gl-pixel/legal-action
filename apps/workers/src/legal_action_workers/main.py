from legal_action_workers.client import build_hatchet_client
from legal_action_workers.config import get_settings


def main() -> None:
    settings = get_settings()
    if not settings.hatchet_client_token:
        # TODO(robin, 2026-06-13, #2): brancher Hatchet une fois le compte cree.
        raise SystemExit("HATCHET_CLIENT_TOKEN manquant — voir apps/workers/.env.example")

    client = build_hatchet_client(settings)
    worker = client.worker("legal-action-workers")
    # TODO(robin, 2026-06-13, #2): enregistrer les workflows (relances J+15, saisine mediateur).
    worker.start()


if __name__ == "__main__":
    main()

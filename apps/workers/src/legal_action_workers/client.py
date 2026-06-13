from typing import TYPE_CHECKING

from legal_action_workers.config import WorkersSettings

if TYPE_CHECKING:
    from hatchet_sdk import Hatchet


def build_hatchet_client(settings: WorkersSettings) -> "Hatchet":
    # Import paresseux : hatchet-sdk fait du I/O au boot (gRPC channel),
    # incompatible avec la regle "pas d'IO dans __init__.py".
    from hatchet_sdk import Hatchet

    return Hatchet(debug=settings.app_env == "development")

from enum import StrEnum


class CasType(StrEnum):
    RESILIATION_REFUSEE = "resiliation_refusee"
    PRELEVEMENT_APRES_RESILIATION = "prelevement_apres_resiliation"
    SURFACTURATION = "surfacturation"
    PANNE_LONGUE_DUREE = "panne_longue_duree"
    FRAIS_RESILIATION = "frais_resiliation"


class Operateur(StrEnum):
    FREE = "free"
    SFR = "sfr"
    ORANGE = "orange"
    BOUYGUES = "bouygues"

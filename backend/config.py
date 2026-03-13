import os
from pathlib import Path

class Settings:
    BASE_DIR = Path(__file__).resolve().parent
    DATA_DIR = BASE_DIR / "data"

    EPHEMERIS_FILE = DATA_DIR / "de421.bsp"
    HIPPARCOS_RAW = DATA_DIR / "hip_main.dat"
    HIPPARCOS_PARQUET = DATA_DIR / "hipparcos.parquet"

settings = Settings()


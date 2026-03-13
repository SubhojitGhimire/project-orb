import pandas as pd
from functools import lru_cache

from skyfield.api import load
from skyfield.data import hipparcos

from config import settings

@lru_cache()
def load_ephemeris():
    if not settings.EPHEMERIS_FILE.exists():
        raise FileNotFoundError(f"Ephemeris file not found at: {settings.EPHEMERIS_FILE}")
    return load(str(settings.EPHEMERIS_FILE))

@lru_cache()
def load_stars():
    if settings.HIPPARCOS_PARQUET.exists():
        print(f"Parquet found. Loading stars...")
        df = pd.read_parquet(settings.HIPPARCOS_PARQUET)
        return df

    print("Parquet not found. Processing raw hip_main.dat...")
    if not settings.HIPPARCOS_RAW.exists():
        raise FileNotFoundError(f"Raw Hipparcos data not found at: {settings.HIPPARCOS_RAW}")

    with load.open(str(settings.HIPPARCOS_RAW)) as f:
        df = hipparcos.load_dataframe(f)

    columns_to_keep = [
        'ra_degrees', 'dec_degrees', 'magnitude', 'parallax_mas',
        'epoch_year', 'ra_mas_per_year', 'dec_mas_per_year', 'ra_hours'
    ]
    existing_cols = [c for c in columns_to_keep if c in df.columns]
    df = df[existing_cols]
    df = df.dropna()
    df = df.astype(float)
    df.to_parquet(settings.HIPPARCOS_PARQUET)
    print(f"Parquet successfully created at: {settings.HIPPARCOS_PARQUET}")
    return df


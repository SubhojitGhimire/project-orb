import os
import requests
from tqdm import tqdm

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from api_endpoints import router

app = FastAPI(
    title = "Project Orb API",
    description = "Astronomical calculation engine for rendering the night sky.",
    version = "1.0.0"
)

origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000", # React default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(router, prefix = "/api")

@app.get("/")
def root():
    return {"message": "Welcome to Project Orb. Visit /docs for API documentation."}

@app.on_event("startup")
async def startup_event():
    settings.DATA_DIR.mkdir(parents = True, exist_ok = True)

    if not settings.EPHEMERIS_FILE.exists():
        print(f"Ephemeris file missing. Downloading...")
        from skyfield.api import Loader
        load = Loader(settings.DATA_DIR)
        load('de421.bsp')
    
    if not settings.HIPPARCOS_RAW.exists():
        from skyfield.api import Loader
        from skyfield.data import hipparcos
        print(f"Star catalog missing. Downloading...")
        load = Loader(settings.DATA_DIR)
        load.open(hipparcos.URL)

        if os.path.exists('hip_main.dat'):
            os.rename('hip_main.dat', settings.HIPPARCOS_RAW)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host = "0.0.0.0", port = 8000, reload = True)


from pydantic import BaseModel

from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="project_orb_v1_user_001")

from fastapi import APIRouter, HTTPException
router = APIRouter()

from schemas import SkyRequest, SkyResponse
from astronomy import calculate_sky_at_location

@router.get("/health") # Simple heartbeat check to verify server is running.
async def health_check():
    return {"status": "alive", "project": "Orb"}

@router.post("/sky", response_model = SkyResponse)
async def get_sky_data(payload: SkyRequest):
    try:
        result = calculate_sky_at_location(
            lat = payload.latitude,
            lon = payload.longitude,
            time_obj = payload.time
        )
        return result
    except FileNotFoundError as e:
        raise HTTPException(status_code = 500, detail = f"Data missing: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))

class LocationQuery(BaseModel):
    query: str
@router.post("/geocode")
async def geocode_location(payload: LocationQuery):
    try:
        location = geolocator.geocode(payload.query)
        if location:
            return {
                "status": "success",
                "name": location.address,
                "latitude": location.latitude,
                "longitude": location.longitude
            }
        else:
            raise HTTPException(status_code = 404, detail = "Location not found")
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))


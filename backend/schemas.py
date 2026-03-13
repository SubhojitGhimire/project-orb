from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

class SkyRequest(BaseModel):
    latitude: float
    longitude: float
    time: Optional[datetime] = Field(default_factory=datetime.utcnow)

    @field_validator('time')
    def set_time_if_none(cls, v):
        return v or datetime.utcnow()

class StarData(BaseModel):
    ids: List[int]
    ra: List[float]
    dec: List[float]
    altitude: List[float]
    azimuth: List[float]
    magnitude: List[float]

class PlanetData(BaseModel):
    names: List[str]
    altitude: List[float]
    azimuth: List[float]

class DSOData(BaseModel):
    names: List[str]
    types: List[str]
    altitude: List[float]
    azimuth: List[float]
    magnitude: List[float]

class MilkyWayData(BaseModel):
    ids: List[int]
    altitude: List[float]
    azimuth: List[float]
    intensity: List[float]

class SkyResponse(BaseModel):
    status: str
    observer_location: dict
    timestamp: datetime
    star_count: int
    stars: StarData
    planets: PlanetData
    dsos: DSOData
    milkyway: MilkyWayData


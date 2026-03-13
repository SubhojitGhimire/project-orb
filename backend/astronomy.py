import numpy as np
from pytz import utc

from skyfield.data import hipparcos
from skyfield.api import wgs84, Star, load

from catalogs import load_ephemeris, load_stars


# 5 Dwarf Planets (Approximate J2025/2026 Coordinates)
# Eris, Haumea, Makemake move extremely slowly. Ceres moves faster, but we'll fix their positions for simplicity. Pluto is included with planets.
DWARF_COORDS = [
    {"name": "Ceres", "ra": 18.0, "dec": -24.0}, # Approx near Sagittarius for 2026
    {"name": "Eris", "ra": 1.9, "dec": -1.5},    # In Cetus
    {"name": "Haumea", "ra": 14.5, "dec": 16.0}, # In Bootes
    {"name": "Makemake", "ra": 13.0, "dec": 21.0} # In Coma Berenices
]

# Top 30 DSOs
MESSIER_OBJECTS = [
    {"name": "M31 (Andromeda)", "type": "Galaxy", "ra": 0.712, "dec": 41.26, "mag": 3.4},
    {"name": "M42 (Orion Nebula)", "type": "Nebula", "ra": 5.588, "dec": -5.39, "mag": 4.0},
    {"name": "M45 (Pleiades)", "type": "Cluster", "ra": 3.783, "dec": 24.11, "mag": 1.6},
    {"name": "M13 (Hercules Cluster)", "type": "Cluster", "ra": 16.695, "dec": 36.46, "mag": 5.8},
    {"name": "M8 (Lagoon Nebula)", "type": "Nebula", "ra": 18.06, "dec": -24.38, "mag": 6.0},
    {"name": "M1 (Crab Nebula)", "type": "Nebula", "ra": 5.575, "dec": 22.01, "mag": 8.4},
    {"name": "M33 (Triangulum)", "type": "Galaxy", "ra": 1.564, "dec": 30.66, "mag": 5.7},
    {"name": "M57 (Ring Nebula)", "type": "Nebula", "ra": 18.893, "dec": 33.03, "mag": 8.8},
    {"name": "M27 (Dumbbell)", "type": "Nebula", "ra": 19.993, "dec": 22.72, "mag": 7.5},
    {"name": "M16 (Eagle Nebula)", "type": "Nebula", "ra": 18.31, "dec": -13.84, "mag": 6.4},
    {"name": "M20 (Trifid Nebula)", "type": "Nebula", "ra": 18.03, "dec": -23.03, "mag": 6.3},
    {"name": "M51 (Whirlpool)", "type": "Galaxy", "ra": 13.498, "dec": 47.19, "mag": 8.4},
    {"name": "M44 (Beehive)", "type": "Cluster", "ra": 8.667, "dec": 19.67, "mag": 3.7},
    {"name": "M6 (Butterfly)", "type": "Cluster", "ra": 17.668, "dec": -32.22, "mag": 4.2},
    {"name": "M7 (Ptolemy Cluster)", "type": "Cluster", "ra": 17.898, "dec": -34.79, "mag": 3.3},
    {"name": "M41", "type": "Cluster", "ra": 6.783, "dec": -20.76, "mag": 4.5},
    {"name": "M11 (Wild Duck)", "type": "Cluster", "ra": 18.85, "dec": -6.27, "mag": 6.3},
    {"name": "M104 (Sombrero)", "type": "Galaxy", "ra": 12.667, "dec": -11.62, "mag": 8.0},
    {"name": "M81 (Bode's Galaxy)", "type": "Galaxy", "ra": 9.925, "dec": 69.06, "mag": 6.9},
    {"name": "M82 (Cigar Galaxy)", "type": "Galaxy", "ra": 9.928, "dec": 69.68, "mag": 8.4},
    {"name": "M17 (Omega Nebula)", "type": "Nebula", "ra": 18.34, "dec": -16.17, "mag": 6.0},
    {"name": "M22", "type": "Cluster", "ra": 18.60, "dec": -23.90, "mag": 5.1},
    {"name": "M35", "type": "Cluster", "ra": 6.15, "dec": 24.33, "mag": 5.3},
    {"name": "M36", "type": "Cluster", "ra": 5.60, "dec": 34.13, "mag": 6.3},
    {"name": "M37", "type": "Cluster", "ra": 5.87, "dec": 32.55, "mag": 6.2},
    {"name": "M38", "type": "Cluster", "ra": 5.47, "dec": 35.85, "mag": 7.4},
    {"name": "M4 (Scorpius)", "type": "Cluster", "ra": 16.39, "dec": -26.53, "mag": 5.6},
    {"name": "M64 (Black Eye)", "type": "Galaxy", "ra": 12.94, "dec": 21.68, "mag": 8.5},
    {"name": "M101 (Pinwheel)", "type": "Galaxy", "ra": 14.05, "dec": 54.35, "mag": 7.9},
    {"name": "M10 (Ophiuchus)", "type": "Cluster", "ra": 16.95, "dec": -4.10, "mag": 6.6}
]

# Milky Way Generator
def generate_galactic_cloud():
    num_points = 1500
    
    # Random Galactic Coordinates
    l = np.random.uniform(0, 360, num_points)
    b = np.random.normal(0, 8, num_points)
    l_rad = np.radians(l)
    b_rad = np.radians(b)
    
    # J2000 Constants
    alpha_G = np.radians(192.85948)
    delta_G = np.radians(27.12825)
    l_omega = np.radians(32.93192)
    
    # Conversion Logic (With Safety Clamp)
    sin_delta = np.sin(delta_G) * np.sin(b_rad) + np.cos(delta_G) * np.cos(b_rad) * np.cos(l_rad - l_omega)
    sin_delta = np.clip(sin_delta, -1.0, 1.0)
    dec_rad = np.arcsin(sin_delta)
    y = np.cos(b_rad) * np.sin(l_rad - l_omega)
    x = np.cos(delta_G) * np.sin(b_rad) - np.sin(delta_G) * np.cos(b_rad) * np.cos(l_rad - l_omega)
    ra_minus_alpha = np.arctan2(y, x)
    ra_rad = ra_minus_alpha + alpha_G
    ra_hours = np.degrees(ra_rad) / 15.0
    dec_degrees = np.degrees(dec_rad)
    intensity = np.exp(-(b**2) / (2 * (8**2))) 
    
    return ra_hours, dec_degrees, intensity
MW_RA, MW_DEC, MW_INT = generate_galactic_cloud()

# Calculate the positions of stars, planets etc. as seen from a specific location on Earth at a given time.
def calculate_sky_at_location(lat: float, lon: float, time_obj):
    # Load Data
    eph = load_ephemeris()
    stars_df = load_stars()
    earth = eph['earth']
    ts = load.timescale()
    
    # Time Setup
    if time_obj.tzinfo is None:
        time_obj = time_obj.replace(tzinfo = utc)
    t = ts.from_datetime(time_obj)

    # Observer Setup
    location = wgs84.latlon(float(lat), float(lon))
    observer = (earth + location).at(t)
    
    # Stars
    limit_magnitude = 6.0 
    bright_stars = stars_df[stars_df['magnitude'] <= limit_magnitude]
    star_objects = Star.from_dataframe(bright_stars)
    astrometric_stars = observer.observe(star_objects)
    apparent_stars = astrometric_stars.apparent()
    alt_stars, az_stars, _ = apparent_stars.altaz()

    # Planets, Sun, Moon, Dwarf Planets
    solar_system = {
        'Sun': eph['sun'],
        'Mercury': eph['mercury'],
        'Venus': eph['venus'],
        'Moon': eph['moon'],
        'Mars': eph['mars'],
        'Jupiter': eph['jupiter_barycenter'],
        'Saturn': eph['saturn_barycenter'],
        'Uranus': eph['uranus_barycenter'],
        'Neptune': eph['neptune_barycenter'],
        'Pluto': eph['pluto_barycenter']
    }
    planet_results = {
        "names": [],
        "altitude": [],
        "azimuth": []
    }
    for name, body in solar_system.items():
        astrometric = observer.observe(body)
        apparent = astrometric.apparent()
        alt, az, _ = apparent.altaz()
        
        planet_results["names"].append(name)
        planet_results["altitude"].append(alt.degrees)
        planet_results["azimuth"].append(az.degrees)
    
    for dwarf in DWARF_COORDS:
        target = Star(ra_hours = dwarf['ra'], dec_degrees = dwarf['dec'])
        astrometric = observer.observe(target)
        apparent = astrometric.apparent()
        alt, az, _ = apparent.altaz()
        planet_results["names"].append(dwarf['name'])
        planet_results["altitude"].append(alt.degrees)
        planet_results["azimuth"].append(az.degrees)

    # DSOs (Deep Sky Objects)
    dso_results = {
        "names": [], 
        "types": [], 
        "altitude": [], 
        "azimuth": [], 
        "magnitude": []
    }
    for dso in MESSIER_OBJECTS:
        target = Star(ra_hours = dso['ra'], dec_degrees = dso['dec'])
        astrometric = observer.observe(target)
        apparent = astrometric.apparent()
        alt, az, _ = apparent.altaz()
        
        dso_results["names"].append(dso['name'])
        dso_results["types"].append(dso['type'])
        dso_results["altitude"].append(alt.degrees)
        dso_results["azimuth"].append(az.degrees)
        dso_results["magnitude"].append(dso['mag'])
    
    # Milky Way
    mw_targets = Star(ra_hours = MW_RA, dec_degrees = MW_DEC)
    astrometric_mw = observer.observe(mw_targets)
    apparent_mw = astrometric_mw.apparent()
    alt_mw, az_mw, _ = apparent_mw.altaz()
    
    mw_results = {
        "ids": list(range(len(MW_RA))),
        "altitude": alt_mw.degrees.tolist(),
        "azimuth": az_mw.degrees.tolist(),
        "intensity": MW_INT.tolist()
    }

    return {
        "status": "success",
        "observer_location": {"lat": lat, "lon": lon},
        "timestamp": time_obj,
        "star_count": len(bright_stars),
        "stars": {
            "ids": bright_stars.index.tolist(),
            "ra": bright_stars['ra_degrees'].tolist(),
            "dec": bright_stars['dec_degrees'].tolist(),
            "altitude": alt_stars.degrees.tolist(),
            "azimuth": az_stars.degrees.tolist(),
            "magnitude": bright_stars['magnitude'].tolist(),
        },
        "planets": planet_results,
        "dsos": dso_results,
        "milkyway": mw_results
    }


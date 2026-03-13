# Project Orb - Interactive 3D Planetarium & Sky Navigator

![React](https://img.shields.io/badge/React-18.0-blue.svg)
![Three.js](https://img.shields.io/badge/Three.js-r3f-black.svg)
![Python](https://img.shields.io/badge/Python-3.10-yellow.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95-green.svg)
![License](https://img.shields.io/badge/License-MIT-orange.svg)

A scientifically accurate, browser-based 3D planetarium that renders the night sky in real-time. Project Orb combines a high-performance React/Three.js frontend with a robust Python astronomy engine to visualize stars, planets, constellations, and deep sky objects based on precise location and time data.

---

## Screenshots

<img width="1920" height="1080" alt="Project-Orb-Preview" src="[INSERT_YOUR_SCREENSHOT_LINK_HERE]" />

## Features

1. **Scientifically Accurate Astronomy Engine:**
   - **Backend:** Powered by Python's `Skyfield` and NASA's JPL Ephemeris (`de421.bsp`), calculating precise Right Ascension (RA), Declination (Dec), Altitude, and Azimuth for celestial bodies.
   - **Real-Time Data:** Calculates sky positions based on the user's exact latitude, longitude, and local time.

2. **Immersive 3D Rendering:**
   - **Star Field:** Renders thousands of stars from the Hipparcos catalog using custom shaders for realistic twinkling, spectral coloring, and magnitude-based sizing.
   - **The Milky Way:** A volumetric particle system representing the galactic plane, generated procedurally to align with celestial coordinates.
   - **Solar System:** accurate rendering of the Sun, Moon, Planets (including Uranus/Neptune), and Dwarf Planets (Pluto, Ceres, Eris, etc.).

3. **Constellation & Deep Sky Management:**
   - **Tiered Constellations:** View the sky in layers: "Iconic" (Big Dipper, Orion), "Zodiac", and "Tier 3" (The rest of the 88 IAU constellations).
   - **Deep Sky Objects (DSOs):** Interactive markers for Galaxies, Nebulas, and Star Clusters (Messier Catalog) with visual distinct types.
   - **Interactive Lines:** Hover over constellation lines to highlight them; click to view detailed mythology and astronomical data.

4. **Dynamic Event System:**
   - **Meteor Showers:** A smart particle system that triggers specific showers (Perseids, Geminids, etc.) based on the selected date, featuring scientifically accurate radiant perspective logic.
   - **Time Travel:** A "Time Controller" HUD allowing users to play/pause time, scrub through a 24-hour cycle, or jump to specific historical/future dates to witness celestial alignment changes.

5. **Advanced Navigation & UI:**
   - **Smart Search:** A unified search bar to instantly locate and pan the camera to Cities (Location) or Celestial Objects (Stars, Constellations).
   - **Context Menu:** A custom right-click menu to toggle UI visibility (Cinematic Mode), enter Full Screen, or perform a Hard Reset.
   - **Info Panels:** Sleek glassmorphism panels displaying detailed information about selected objects.
   - **Compass & Grid:** A HUD compass and azimuthal grid to help orient the user in 3D space.

## Pre-requisites and Setup

**Backend Setup:**

- Download and Install `python 3.10.10` and `uvicorn 0.40.0`, then from backend directory of this project, install required python dependencies.

```bash
cd backend
# Install dependencies
pip install -r requirements.txt
```

**Frontend Setup:**

- Download and Install `Node.js v24.13.0` and/or `npm 11.6.2`, then from frontend directory of this project, install required Node.js dependencies.

```bash
cd frontend
# Install dependencies
npm install three @react-three/fiber @react-three/drei axios
```

## Usage/Running

### 1. Backend (API)

The backend handles the astronomical calculations.

```bash
cd backend
# Run the server
uvicorn main:app --reload
```

The API will start at http://127.0.0.1:8000

**_Keep Backend running. In new terminal, start frontend._**

### 2. Frontend (UI)

The frontend renders the 3D environment.

```bash
cd frontend
# Run the development server
npm run dev
```

Open the link provided (usually http://localhost:5173) in your browser.

## Controls

1. Left Click + Drag: Rotate the camera (Look around).

2. Scroll: Zoom in/out (Change Field of View).

3. Right Click: Open the Context Menu (Hide UI, Fullscreen, Refresh).

4. Left Click (on Object): Select a star, planet, or constellation to view details.

5. Time Slider: Drag the bottom slider to change the time of day instantly.

## Architecture

1. **Data Source:** The app uses the `hipparcos.parquet` dataset for star catalogs and `de421.bsp` (NASA JPL) for planetary ephemerides.

2. **Coordinate System:** Converts Geocentric Equatorial coordinates (J2000) into Topocentric Horizontal coordinates (Alt/Az) for the observer's location.

3. **Performance:** Uses React Three Fiber's instanced rendering and custom shaders to maintain high FPS even with thousands of objects.

<h1></h1>

This README.md file has been improved for overall readability (grammar, sentence structure, and organization) using AI tools.

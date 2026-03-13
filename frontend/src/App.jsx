import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars as BackgroundStars } from "@react-three/drei";

import { getSkyData } from "./api";
import { Sidebar } from "./components/Sidebar";
import { InfoPanel } from "./components/InfoPanel";
import { Compass } from "./components/StarMap/Compass";
import { TimeController } from "./components/TimeController";

import { MAJOR_STARS } from "./data/stars";
import { DSOs } from "./components/StarMap/DSOs";
import { Stars } from "./components/StarMap/Stars";
import { Planets } from "./components/StarMap/Planets";
import { Meteors } from "./components/StarMap/Meteors";
import { CONSTELLATIONS } from "./data/constellations";
import { MilkyWay } from "./components/StarMap/MilkyWay";
import { Constellations } from "./components/StarMap/Constellations";

function CompassUpdater({ compassRef }) {
  const { camera } = useThree();
  useFrame(() => {
    if (compassRef.current) {
      const azimuth = Math.atan2(camera.position.x, camera.position.z);
      const rotationDeg = azimuth * (180 / Math.PI);
      compassRef.current.style.transform = `rotate(${rotationDeg}deg)`;
    }
  });
  return null;
}

function ContextMenu({
  visible,
  x,
  y,
  uiHidden,
  onToggleUI,
  onFullScreen,
  onRefresh,
  onClose,
}) {
  if (!visible) return null;

  const style = {
    position: "absolute",
    top: y,
    left: x,
    zIndex: 1000,
    background: "rgba(20, 20, 30, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "5px 0",
    minWidth: "180px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    color: "white",
    fontSize: "0.9rem",
    userSelect: "none",
  };

  const itemStyle = {
    padding: "10px 15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.2s",
  };

  const hoverBg = (e) => (e.target.style.background = "rgba(255,255,255,0.1)");
  const leaveBg = (e) => (e.target.style.background = "transparent");

  return (
    <div style={style} onMouseLeave={onClose}>
      <div
        style={itemStyle}
        onMouseEnter={hoverBg}
        onMouseLeave={leaveBg}
        onClick={onToggleUI}
      >
        <span>⎚</span>
        {uiHidden ? "Show UI Components" : "Hide UI components"}
      </div>

      <div
        style={itemStyle}
        onMouseEnter={hoverBg}
        onMouseLeave={leaveBg}
        onClick={onFullScreen}
      >
        <span>⛶</span> Toggle Full Screen
      </div>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          margin: "5px 0",
        }}
      />

      <div
        style={{ ...itemStyle, color: "#ff6666" }}
        onMouseEnter={hoverBg}
        onMouseLeave={leaveBg}
        onClick={onRefresh}
      >
        <span>⟳</span> Hard Reset
      </div>
    </div>
  );
}

function App() {
  const [skyData, setSkyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    latitude: 27.7172,
    longitude: 85.324,
    time: new Date().toISOString().slice(0, 16),
    locationName: "Kathmandu, Nepal",
    starCount: 0,
  });
  const [fov, setFov] = useState(60);
  const compassRef = useRef(null);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const controlsRef = useRef();
  const [showUI, setShowUI] = useState(true);
  const [menuState, setMenuState] = useState({ visible: false, x: 0, y: 0 });
  const [viewSettings, setViewSettings] = useState({
    showGrid: true,
    showStars: true,
    showPlanets: true,
    showPlanetLabels: false,
    showConstellations: true,
    showTier1: true,
    showTier2: true,
    showTier3: false,
    showConstellationLabels: false,
    showDSOs: true,
    showDSOLabels: false,
    showMilkyWay: true,
    showMeteors: true,
  });

  const fetchSky = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const isoTime = new Date(params.time).toISOString();
      const data = await getSkyData(
        parseFloat(params.latitude),
        parseFloat(params.longitude),
        isoTime,
      );
      setSkyData(data);
      setParams((prev) => ({ ...prev, starCount: data.star_count }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.locationName) fetchSky();
  }, [params.locationName]);
  useEffect(() => {
    const timer = setTimeout(() => fetchSky(), 50);
    return () => clearTimeout(timer);
  }, [params.time]);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setMenuState({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const closeMenu = useCallback(
    () => setMenuState({ ...menuState, visible: false }),
    [menuState],
  );

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen();
    }
    closeMenu();
  };

  const handleHardRefresh = () => {
    if (
      window.confirm("This will clear all settings and reload. Are you sure?")
    ) {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      window.location.reload(true);
    }
    closeMenu();
  };

  const handleTimeChange = useCallback(
    (newTimeStr) => setParams((prev) => ({ ...prev, time: newTimeStr })),
    [],
  );

  const handleReset = useCallback(() => {
    setFov(60);
    if (controlsRef.current) controlsRef.current.reset();
  }, []);

  const handleWheel = (e) => {
    setFov((prev) => Math.max(10, Math.min(100, prev + e.deltaY * 0.05)));
  };

  const handleObjectSearch = useCallback(
    (name) => {
      if (!skyData || !controlsRef.current) return;
      const query = name.toLowerCase();

      const constellation = CONSTELLATIONS.find(
        (c) => c.name.toLowerCase() === query,
      );
      if (constellation) {
        const idx = skyData.stars.ids.indexOf(constellation.anchor);
        if (idx > -1)
          moveCamera(skyData.stars.altitude[idx], skyData.stars.azimuth[idx]);
        setSelectedConstellation(constellation);
        return;
      }

      const star = MAJOR_STARS.find((s) => s.name.toLowerCase() === query);
      if (star) {
        const idx = skyData.stars.ids.indexOf(star.id);
        if (idx > -1)
          moveCamera(skyData.stars.altitude[idx], skyData.stars.azimuth[idx]);
        return;
      }
      alert("Object not found or below horizon.");
    },
    [skyData],
  );

  const moveCamera = (alt, az) => {
    const theta = az * (Math.PI / 180) + Math.PI;
    const phi = (90 - alt) * (Math.PI / 180);
    controlsRef.current.setAzimuthalAngle(theta);
    controlsRef.current.setPolarAngle(phi);
    controlsRef.current.update();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
      }}
      onWheel={handleWheel}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
    >
      <ContextMenu
        visible={menuState.visible}
        x={menuState.x}
        y={menuState.y}
        uiHidden={!showUI}
        onToggleUI={() => {
          setShowUI(!showUI);
          closeMenu();
        }}
        onFullScreen={toggleFullScreen}
        onRefresh={handleHardRefresh}
        onClose={closeMenu}
      />

      {showUI && (
        <>
          <Sidebar
            params={params}
            setParams={setParams}
            onUpdate={fetchSky}
            onReset={handleReset}
            loading={loading}
            viewSettings={viewSettings}
            setViewSettings={setViewSettings}
            onSearchObject={handleObjectSearch}
            isPlaying={isPlaying}
          />

          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              color: "white",
              opacity: 0.5,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            <p>FOV: {Math.round(fov)}° (Scroll to Zoom)</p>
          </div>

          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: "60px",
              height: "60px",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <div
              ref={compassRef}
              style={{
                width: "100%",
                height: "100%",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  color: "#ff5555",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                N
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  color: "white",
                  fontSize: "10px",
                }}
              >
                S
              </div>
              <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.8)" }}>
                ↑
              </div>
            </div>
          </div>

          <InfoPanel
            selected={selectedConstellation}
            onClose={() => setSelectedConstellation(null)}
          />

          <TimeController
            time={params.time}
            onTimeChange={handleTimeChange}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </>
      )}

      <Canvas camera={{ position: [0, 0, 0.1], fov: 60 }}>
        <CameraUpdater fov={fov} />
        <CompassUpdater compassRef={compassRef} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
          reverseOrbit={true}
        />

        {skyData && <Stars data={skyData} visible={viewSettings.showStars} />}

        {skyData && skyData.milkyway && (
          <MilkyWay
            data={skyData.milkyway}
            visible={viewSettings.showMilkyWay}
          />
        )}

        {skyData && skyData.planets && (
          <Planets
            data={skyData.planets}
            visible={viewSettings.showPlanets}
            showLabels={viewSettings.showPlanetLabels}
          />
        )}

        {skyData && (
          <Constellations
            data={skyData.stars}
            visible={viewSettings.showConstellations}
            showLabels={viewSettings.showConstellationLabels}
            onSelect={setSelectedConstellation}
            tiers={{
              tier1: viewSettings.showTier1,
              tier2: viewSettings.showTier2,
              tier3: viewSettings.showTier3,
            }}
          />
        )}

        {skyData && skyData.dsos && (
          <DSOs
            data={skyData.dsos}
            visible={viewSettings.showDSOs}
            showLabels={viewSettings.showDSOLabels}
            onSelect={setSelectedConstellation}
          />
        )}

        {viewSettings.showMeteors && <Meteors dateStr={params.time} />}

        <group visible={viewSettings.showGrid}>
          <Compass />
        </group>

        <BackgroundStars
          radius={300}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
export default App;

function CameraUpdater({ fov }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);
  return null;
}

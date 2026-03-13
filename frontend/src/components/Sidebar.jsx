import React, { useState, useMemo } from "react";

import { CITIES } from "../data/locations";
import { MAJOR_STARS } from "../data/stars";
import { CONSTELLATIONS } from "../data/constellations";

export const Sidebar = React.memo(function Sidebar({
  params,
  setParams,
  onUpdate,
  onReset,
  loading,
  viewSettings,
  setViewSettings,
  onSearchObject,
  isPlaying,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [skyQuery, setSkyQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSkyDropdown, setShowSkyDropdown] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchQuery) return [];
    return CITIES.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ).slice(0, 5);
  }, [searchQuery]);

  const selectCity = (city) => {
    setParams((prev) => ({
      ...prev,
      latitude: city.lat,
      longitude: city.lon,
      locationName: city.name,
    }));
    setSearchQuery(city.name);
    setShowDropdown(false);
  };

  const filteredSkyObjects = useMemo(() => {
    if (!skyQuery) return [];
    const query = skyQuery.toLowerCase();

    const constellations = CONSTELLATIONS.filter((c) =>
      c.name.toLowerCase().includes(query),
    ).map((c) => ({ ...c, type: "constellation" }));

    const stars = MAJOR_STARS.filter((s) =>
      s.name.toLowerCase().includes(query),
    ).map((s) => ({ ...s, type: "star" }));

    return [...constellations, ...stars].slice(0, 8);
  }, [skyQuery]);

  const selectSkyObject = (obj) => {
    setSkyQuery(obj.name);
    setShowSkyDropdown(false);
    onSearchObject(obj.name);
  };

  const toggleSetting = (key) => {
    setViewSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const panelStyle = {
    width: "320px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "rgba(20, 20, 30, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
    padding: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    display: isOpen ? "block" : "none",
    scrollbarWidth: "thin",
    scrollbarColor: "#444 transparent",
  };
  const commonInputStyle = {
    width: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    border: "1px solid #444",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "5px",
    boxSizing: "border-box",
    fontSize: "0.9rem",
  };
  const layerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #333",
    fontSize: "0.9rem",
    color: "#ddd",
    cursor: "pointer",
  };
  const toggleSwitchStyle = (isActive) => ({
    width: "36px",
    height: "18px",
    background: isActive ? "#4ADE80" : "#444",
    borderRadius: "10px",
    position: "relative",
    transition: "background 0.2s",
  });
  const toggleKnobStyle = (isActive) => ({
    width: "14px",
    height: "14px",
    background: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: isActive ? "20px" : "2px",
    transition: "left 0.2s",
  });

  const ToggleItem = ({ label, settingKey, indent }) => (
    <div
      style={{ ...layerRowStyle, paddingLeft: indent ? "20px" : "0" }}
      onClick={() => toggleSetting(settingKey)}
    >
      <span>{label}</span>
      <div style={toggleSwitchStyle(viewSettings[settingKey])}>
        <div style={toggleKnobStyle(viewSettings[settingKey])} />
      </div>
    </div>
  );

  return (
    <div
      style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}
    >
      <button
        style={{
          width: "40px",
          height: "40px",
          background: "rgba(20,20,30,0.8)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          color: "white",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      <div style={panelStyle} onWheel={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}>
            <img
              src="favicon.png"
              alt="Orb Logo"
              style={{
                width: "auto",
                height: "20px",
                position: "relative",
                top: "4px",
              }}
            />{" "}
            &nbsp; Project Orb
          </h2>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "#aaa",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => setIsOpen(false)}
          >
            −
          </button>
        </div>

        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label
            style={{
              fontSize: "0.75rem",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Location
          </label>
          <input
            type="text"
            placeholder="Search City..."
            style={commonInputStyle}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && filteredCities.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                width: "100%",
                background: "#222",
                border: "1px solid #444",
                borderRadius: "0 0 6px 6px",
                zIndex: 20,
              }}
            >
              {filteredCities.map((city) => (
                <div
                  key={city.name}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #333",
                    fontSize: "0.9rem",
                    color: "#eee",
                  }}
                  onClick={() => selectCity(city)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          )}
          <div
            style={{ fontSize: "0.8rem", color: "#4ADE80", marginTop: "5px" }}
          >
            📍 {params.locationName}
          </div>
        </div>

        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label
            style={{
              fontSize: "0.75rem",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Find in Sky
          </label>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              placeholder="Star / Constellation..."
              style={commonInputStyle}
              value={skyQuery}
              onChange={(e) => {
                setSkyQuery(e.target.value);
                setShowSkyDropdown(true);
              }}
              onFocus={() => setShowSkyDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && onSearchObject(skyQuery)}
            />
            <button
              onClick={() => onSearchObject(skyQuery)}
              style={{
                ...commonInputStyle,
                width: "auto",
                cursor: "pointer",
                background: "#333",
              }}
            >
              Go
            </button>
          </div>

          {showSkyDropdown && filteredSkyObjects.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                width: "100%",
                background: "#222",
                border: "1px solid #444",
                borderRadius: "0 0 6px 6px",
                zIndex: 20,
              }}
            >
              {filteredSkyObjects.map((obj) => (
                <div
                  key={obj.name}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #333",
                    fontSize: "0.9rem",
                    color: "#eee",
                  }}
                  onClick={() => selectSkyObject(obj)}
                >
                  <span style={{ marginRight: "8px" }}>
                    {obj.type === "star" ? "★" : "☖"}
                  </span>
                  {obj.name}
                  <span
                    style={{
                      fontSize: "0.7em",
                      color: "#aaa",
                      marginLeft: "5px",
                    }}
                  >
                    ({obj.meaning})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #333",
            margin: "15px 0",
          }}
        />

        <label style={{ fontSize: "0.75rem", color: "#aaa" }}>
          DATE & TIME (UTC)
        </label>
        <input
          type="datetime-local"
          style={commonInputStyle}
          value={params.time}
          onChange={(e) => setParams((p) => ({ ...p, time: e.target.value }))}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            style={commonInputStyle}
            value={params.latitude}
            onChange={(e) =>
              setParams((p) => ({ ...p, latitude: e.target.value }))
            }
          />
          <input
            type="number"
            style={commonInputStyle}
            value={params.longitude}
            onChange={(e) =>
              setParams((p) => ({ ...p, longitude: e.target.value }))
            }
          />
        </div>

        <label
          style={{
            fontSize: "0.75rem",
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: "1px",
            display: "block",
            margin: "15px 0 5px 0",
          }}
        >
          Visible Layers
        </label>
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            padding: "0 10px",
            borderRadius: "8px",
          }}
        >
          <ToggleItem label="Reference Grid" settingKey="showGrid" />
          <ToggleItem label="The Milky Way" settingKey="showMilkyWay" />
          <ToggleItem label="Meteor Showers" settingKey="showMeteors" />
          <ToggleItem label="Stars" settingKey="showStars" />
          <ToggleItem label="Solar System" settingKey="showPlanets" />
          {viewSettings.showPlanets && (
            <div style={{ paddingLeft: "20px", marginBottom: "5px" }}>
              <ToggleItem label="Labels" settingKey="showPlanetLabels" />
            </div>
          )}
          <ToggleItem label="Constellations" settingKey="showConstellations" />
          {viewSettings.showConstellations && (
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "4px",
                margin: "5px 0",
              }}
            >
              <ToggleItem
                label="Tier 1: Iconic"
                settingKey="showTier1"
                indent
              />
              <ToggleItem
                label="Tier 2: Zodiac"
                settingKey="showTier2"
                indent
              />
              <ToggleItem
                label="Tier 3: Others"
                settingKey="showTier3"
                indent
              />
              <ToggleItem
                label="Labels"
                settingKey="showConstellationLabels"
                indent
              />
            </div>
          )}
        </div>

        <ToggleItem label="Deep Sky Objects" settingKey="showDSOs" />
        {viewSettings.showDSOs && (
          <div style={{ paddingLeft: "20px", marginBottom: "5px" }}>
            <ToggleItem label="Labels" settingKey="showDSOLabels" />
          </div>
        )}

        <button
          style={{
            ...commonInputStyle,
            background: isPlaying
              ? "#4ADE80"
              : loading
                ? "#555"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            marginTop: "20px",
            fontWeight: "bold",
            color: isPlaying ? "black" : "white",
          }}
          onClick={onUpdate}
          disabled={loading || isPlaying}
        >
          {isPlaying
            ? "Autoplay Active"
            : loading
              ? "Calculating..."
              : "Update Sky"}
        </button>

        <button
          style={{
            ...commonInputStyle,
            background: "transparent",
            border: "1px solid #444",
            color: "#aaa",
          }}
          onClick={onReset}
        >
          ⟲ Reset View
        </button>
      </div>
    </div>
  );
});

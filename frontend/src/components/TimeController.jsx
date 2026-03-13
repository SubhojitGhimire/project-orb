import React, { useEffect, useRef } from "react";

export function TimeController({
  time,
  onTimeChange,
  isPlaying,
  setIsPlaying,
}) {
  const timeRef = useRef(time);
  const onTimeChangeRef = useRef(onTimeChange);

  useEffect(() => {
    timeRef.current = time;
    onTimeChangeRef.current = onTimeChange;
  }, [time, onTimeChange]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const date = new Date(timeRef.current);
        date.setMinutes(date.getMinutes() + 15);
        const nextTime = toLocalISOString(date);
        onTimeChangeRef.current(nextTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date - offset).toISOString().slice(0, 16);
  };

  const handleSliderChange = (e) => {
    const totalMinutes = parseInt(e.target.value);
    const date = new Date(time);
    date.setHours(Math.floor(totalMinutes / 60));
    date.setMinutes(totalMinutes % 60);
    onTimeChange(toLocalISOString(date));
  };

  const dateObj = new Date(time);
  const minutesValue = dateObj.getHours() * 60 + dateObj.getMinutes();

  const styles = {
    container: {
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      background: "rgba(20, 20, 30, 0.9)",
      backdropFilter: "blur(8px)",
      padding: "12px 25px",
      borderRadius: "30px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      zIndex: 20,
      color: "white",
      minWidth: "400px",
    },
    button: {
      background: isPlaying ? "#ff5555" : "#4ADE80",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "black",
      fontSize: "1.2rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      transition: "background 0.2s",
    },
    slider: { flex: 1, cursor: "pointer", accentColor: "#88ccff" },
    display: {
      fontFamily: "monospace",
      fontSize: "1.1rem",
      minWidth: "60px",
      textAlign: "center",
    },
    date: {
      fontSize: "0.75rem",
      color: "#aaa",
      position: "absolute",
      bottom: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "⏸" : "▶"}
      </button>
      <input
        type="range"
        min="0"
        max="1439"
        value={minutesValue}
        onChange={handleSliderChange}
        style={styles.slider}
      />
      <div style={styles.display}>
        {dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div style={styles.date}>{dateObj.toLocaleDateString()}</div>
    </div>
  );
}

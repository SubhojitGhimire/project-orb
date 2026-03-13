import React from "react";

export function InfoPanel({ selected, onClose }) {
  if (!selected) return null;

  const panelStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    width: "350px",
    background: "rgba(20, 20, 30, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px solid rgba(136, 204, 255, 0.3)",
    color: "white",
    padding: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    zIndex: 20,
    animation: "slideUp 0.3s ease-out",
  };

  const titleStyle = {
    margin: "0 0 10px 0",
    fontSize: "1.5rem",
    color: "#88ccff",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>
        {selected.name}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </h2>

      <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
        <p>
          <strong style={{ color: "#aaa" }}>Meaning:</strong> {selected.meaning}
        </p>
        <p>
          <strong style={{ color: "#aaa" }}>Best Season:</strong>{" "}
          {selected.season}
        </p>
        <p>
          <strong style={{ color: "#aaa" }}>Brightest Star:</strong>{" "}
          {selected.brightest}
        </p>
        <p style={{ marginTop: "15px", fontStyle: "italic", color: "#ddd" }}>
          "{selected.description}"
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

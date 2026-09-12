import React from "react";

export function TagPill({ tag, onClick, isSelected }) {
  return (
    <span
      onClick={() => onClick && onClick(tag)}
      style={{
        display: "inline-block",
        backgroundColor: isSelected ? "#007acc" : "#3a3d41",
        color: "#fff",
        padding: "3px 10px",
        borderRadius: "12px",
        fontSize: "0.8rem",
        marginRight: "6px",
        marginBottom: "4px",
        cursor: onClick ? "pointer" : "default",
        border: "1px solid #555"
      }}
    >
      #{tag}
    </span>
  );
}
import React from "react";

export function Badge({ variant = "default", children, style = {}, ...props }) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    cursor: "default",
    userSelect: "none",
  };

  const variants = {
    default: { backgroundColor: "#61daff", color: "white" },
    secondary: { backgroundColor: "#6c757d", color: "white" },
    destructive: { backgroundColor: "#dc3545", color: "white" },
    outline: { borderColor: "#ccc", color: "#333", backgroundColor: "transparent" },
  };

  return (
    <span
      style={{ ...baseStyle, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </span>
  );
}

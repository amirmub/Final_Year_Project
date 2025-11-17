import { useState } from "react";

function StatsCard({ title, value, icon, color }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="rounded-4 p-3"
      style={{
        background: "#ffffff",
        cursor: "pointer",
        transition: "0.35s ease",
        transform: hover ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        borderLeft: `4px solid ${color}`,
        boxShadow: hover
          ? "0 10px 25px rgba(0,0,0,0.12)"
          : "0 6px 15px rgba(0,0,0,0.08)",
        paddingLeft: "18px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Icon */}
      <div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${color}22, ${color}10)`,
          color,
          fontSize: "1.4rem",
          boxShadow: hover
            ? `0 4px 12px ${color}40`
            : `0 2px 6px ${color}25`,
          transition: "0.3s",
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h6
        className="text-muted"
        style={{
          marginBottom: 4,
          letterSpacing: "0.4px",
          fontSize: "0.85rem",
        }}
      >
        {title}
      </h6>

      {/* Value */}
      <h3
        className="fw-bold"
        style={{
          margin: 0,
          color: "#2d2d2d",
          fontSize: "1.75rem",
        }}
      >
        {value}
      </h3>
    </div>
  );
}

export default StatsCard;

import { Card } from "react-bootstrap";

const StatsCard = ({ title, value, icon, color }) => (
  <Card
    className="text-center border-0 shadow-sm hover-card"
    style={{
      borderRadius: "15px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    }}
  >
    <Card.Body className="py-4">
      <div
        className="fs-2 mb-3 d-inline-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: `${color}20`,
          color,
        }}
      >
        {icon}
      </div>
      <h6 className="fw-bold text-muted mt-3">{title}</h6>
      <h3 className="fw-bold text-dark">{value}</h3>
    </Card.Body>
  </Card>
);

export default StatsCard;

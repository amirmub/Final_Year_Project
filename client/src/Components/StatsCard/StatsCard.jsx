import React from "react";
import { Card } from "react-bootstrap";

const StatsCard = ({ title, value, icon, color }) => (
  <Card className="text-center border-0 shadow">
    <Card.Body>
      <div className="fs-2" style={{ color }}>{icon}</div>
      <h6 className="fw-bold mt-2">{title}</h6>
      <h4 className="fw-bold">{value}</h4>
    </Card.Body>
  </Card>
);

export default StatsCard;

import { Card, Badge } from "react-bootstrap";
import { FaTrophy, FaUsers, FaUniversity } from "react-icons/fa";
import winnerImg from "../../../assets/img/winners.png";
import { useState } from "react";

const AnnouncementCard = () => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="rounded-4 p-4 border-0"
      style={{
        transition: "0.35s",
        background: "linear-gradient(180deg,#ffffff,#fafbfd)",
        boxShadow: hover
          ? "0 14px 28px rgba(0,0,0,0.12)"
          : "0 10px 20px rgba(0,0,0,0.07)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        borderLeft: "6px solid #f4c542",
        animation: "fadeIn 0.55s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg,#fff,#fffae5,#fff)",
          padding: "10px 0 12px 0",
          borderRadius: "10px",
        }}
      >
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center ">
          <FaTrophy className="text-warning me-2" />
          Last Year’s Final Project Winners
        </h5>

        <p className="text-muted small mb-0">
          Computing and Informatics — 2023/2024 Academic Year
        </p>
      </div>

      {/* Image */}
      <div
        className="position-relative mt-3"
        style={{
          overflow: "hidden",
          borderRadius: 16,
          height: 240,
        }}
      >
        <Card.Img
          src={winnerImg}
          alt="Project Winners"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.45s",
            transform: hover ? "scale(1.05)" : "scale(1)",
            filter: hover ? "brightness(1.07)" : "brightness(1)",
          }}
        />

        {/* Slight dark fade bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.28), rgba(0,0,0,0))",
          }}
        />
      </div>

      <p className="text-muted text-center small mt-2">
        Jimma University — Tech4Good Winners 2024
      </p>

      {/* Body */}
      <Card.Body className="pt-0">
        <h6 className="fw-bold text-dark">
          Smart Agricultural Management System Using IoT & AI
        </h6>

        <Badge
          bg="warning"
          text="dark"
          className="px-3 py-2 rounded-pill my-3 shadow-sm"
          style={{
            fontWeight: 600,
            fontSize: "0.85rem",
            boxShadow: "0 3px 10px rgba(244,197,66,0.45)",
          }}
        >
          🥇 1st Place — National Tech4Good 2024
        </Badge>

        {/* Team */}
        <div className="mt-2">
          <h6 className="text-muted small fw-semibold mb-1 d-flex align-items-center">
            <FaUsers className="me-2 text-secondary" />
            Team Members
          </h6>
          <p className="small mb-3">
            Abebe Kebede, Tigist Alemu, Mohammed Hassen, Sara Tesfaye,
            Daniel Mengesha
          </p>

          {/* Department */}
          <h6 className="text-muted small fw-semibold mb-1 d-flex align-items-center">
            <FaUniversity className="me-2 text-secondary" />
            Department
          </h6>
          <p className="small mb-0">Computing and Informatics</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCard;

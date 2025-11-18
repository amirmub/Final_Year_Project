import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const AnnouncementPreview = () => {
  const announcements = [
    {
      id: 1,
      title: "Orientation Session",
      date: "2025-11-20",
      description:
        "All new students must attend the orientation session next Wednesday at 10:00 AM in the main hall.",
    },
    {
      id: 2,
      title: "Lab Maintenance",
      date: "2025-11-22",
      description:
        "The computing lab will be closed for maintenance on Friday. Plan your work accordingly.",
    },
    {
      id: 3,
      title: "Research Grant Update",
      date: "2025-11-25",
      description:
        "Final year students applying for the Tech4Good grant must submit their proposals by next Monday.",
    },
  ];

  const themeColor = "#5581BB"; // main theme color
  const dateBackground = "#5581BB"; // date badge background

  return (
    <div style={{ maxWidth: 920, margin: "40px auto", height: "74vh" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: 30,
          fontWeight: 700,
          color: themeColor,
        }}
      >
         Latest Announcements
      </h2>

      {announcements.map((item) => (
        <Card
          key={item.id}
          className="mb-4 py-2 rounded-4 shadow-sm"
          style={{
            backgroundColor: "#fff",
            borderLeft: `3px solid ${themeColor}`,
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
          }}
        >
          <div className="d-flex justify-content-between align-items-start p-3">
            <div>
              <h5 className="fw-bold mb-2" style={{ color: "#212529" }}>
                {item.title}
              </h5>
              <p className="text-muted mb-0 d-flex align-items-center">
                <FaInfoCircle className="me-2" style={{ color: themeColor }} />
                {item.description}
              </p>
            </div>
            <Badge
              className="px-3 py-2 rounded-pill d-flex align-items-center"
              style={{
                fontSize: "0.85rem",
                height: "max-content",
                backgroundColor: dateBackground,
                color: "#fff",
              }}
            >
              <FaCalendarAlt className="me-1" />
              {item.date}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementPreview;

import { Card, Badge } from "react-bootstrap";
import { FaTrophy, FaUsers, FaUniversity } from "react-icons/fa";
import winnerImg from "../../../assets/img/winners.png"; // ← replace with your actual image path

const AnnouncementCard = () => {
  return (
    <Card className="border-0 shadow px-4 py-2 rounded-4 overflow-hidden my-3">
      {/* Header */}
      <Card.Header className="bg-white border-0 pb-0">
        <h5 className="fw-bold text-dark mb-1">
          <FaTrophy className="text-warning me-2" />
          Last Year’s Final Project Winners
        </h5>
        <p className="text-muted small mb-2">
          Computing and Informatics Department — 2023/2024 Academic Year
        </p>
      </Card.Header>

      {/* Image Section */}
      <Card.Img
        variant="top"
        src={winnerImg}
        alt="Project Winners"
        height={300}
        className="rounded-3"
      />
      <p className="text-muted text-center small mt-1 mb-0">
        Jimma University Computing Team — National Tech4Good Competition Winners 2024
      </p>

      {/* Content Section */}
      <Card.Body>
        <h6 className="fw-bold text-dark">
          Smart Agricultural Management System Using IoT and AI
        </h6>

        <Badge bg="warning" text="dark" className="my-2 px-3 py-2 rounded-pill">
          🥇 1st Place — National Tech4Good Competition 2024
        </Badge>

        <div className="mt-3">
          <div className="mb-2">
            <h6 className="text-muted fw-semibold small mb-1">
              <FaUsers className="me-2 text-secondary" />
              Team Members
            </h6>
            <p className="mb-0 small text-dark">
              Abebe Kebede (Team Leader), Tigist Alemu, Mohammed Hassen, Sara Tesfaye, Daniel Mengesha
            </p>
          </div>

          <div>
            <h6 className="text-muted fw-semibold small mb-1">
              <FaUniversity className="me-2 text-secondary" />
              Department
            </h6>
            <p className="mb-0 small text-dark">Computing and Informatics</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCard;

import { Card, Badge } from "react-bootstrap";
import { FaBookOpen, FaUser, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const MySubmissions = () => {
  // Example single submission (replace later with dynamic data)
  const submission = {
    leader: "Amir Mohammed",
    department: "Computer Science",
    title1: "AI-Based Health Monitoring System",
    title2: "Web-Based Student Attendance Tracker",
    title3: "Cloud Storage Optimization with Machine Learning",
    date: "2025-11-10",
    status: "Pending Review",
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge bg="success" className="px-3 py-2">Approved</Badge>;
      case "Rejected":
        return <Badge bg="danger" className="px-3 py-2">Rejected</Badge>;
      default:
        return <Badge bg="warning" text="dark" className="px-3 py-2">Pending Review</Badge>;
    }
  };

  return (
    <div className="mt-4">
      <Card className="border-0 shadow rounded-4 p-4">
        <div className="d-flex align-items-center mb-3">
          <FaBookOpen className="text-primary me-2 fs-4" />
          <h5 className="fw-bold text-primary m-0">My Submission</h5>
        </div>

        <div className="p-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-dark mb-0">
              <FaUser className="me-2 text-secondary" />
              {submission.leader}
            </h6>
            {getStatusBadge(submission.status)}
          </div>

          <div className="mb-3 text-muted">
            <FaBuilding className="me-2 text-secondary" />
            {submission.department}
          </div>

          <div className="bg-light p-3 rounded-3 mb-3">
            <h6 className="fw-bold text-dark mb-2">Submitted Titles:</h6>
            <ul className="mb-0 ps-3">
              <li>{submission.title1}</li>
              <li>{submission.title2}</li>
              <li>{submission.title3}</li>
            </ul>
          </div>

          <div className="text-end text-muted small">
            <FaCalendarAlt className="me-2 text-secondary" />
            Submitted on: {new Date(submission.date).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MySubmissions;

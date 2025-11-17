import { useEffect, useState } from "react";
import { Card, Badge, Spinner } from "react-bootstrap";
import { FaBookOpen, FaUser, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import { useParams } from "react-router-dom";

const MySubmissions = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const token = getAuth().token;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge bg="success" className="px-3 py-2 rounded-pill">Approved</Badge>;
      case "Rejected":
        return <Badge bg="danger" className="px-3 py-2 rounded-pill">Rejected</Badge>;
      default:
        return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">Pending Review</Badge>;
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "Approved":
        return "#28a745";
      case "Rejected":
        return "#dc3545";
      default:
        return "#ffc107";
    }
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`/titles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmission(res.data);
      } catch (error) {
        console.error(error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, token]);

  if (loading)
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "87vh", color: "#6c757d" }}
      >
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your submission...</p>
      </div>
    );

  if (!submission)
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "87vh", color: "#6c757d" }}
      >
        <FaBookOpen style={{ fontSize: "50px", marginBottom: "10px" }} />
        <h5>No submission found.</h5>
      </div>
    );

  return (
    <div className="mt-4" style={{height : "84vh"}}>
      <Card
        className="border-0 shadow rounded-4 p-4"
        style={{
          borderLeft: `6px solid ${getBorderColor(submission.status)}`,
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <FaBookOpen className="text-primary me-2 fs-4" />
          <h5 className="fw-bold text-primary m-0">My Submission</h5>
        </div>

        <div className="p-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold text-dark mb-0 d-flex align-items-center">
              <FaUser className="me-2 text-secondary" />
              {submission.message.name}
            </h6>
            {getStatusBadge(submission.status)}
          </div>

          <div className="mb-3 text-muted d-flex align-items-center">
            <FaBuilding className="me-2 text-secondary" />
            {submission.message.department}
          </div>

          <div className="bg-light p-3 rounded-4 mb-3">
            <h6 className="fw-semibold text-dark mb-2">Submitted Titles</h6>
            <ul className="mb-0 ps-3">
              <li>{submission.message.title_1}</li>
              <li>{submission.message.title_2}</li>
              <li>{submission.message.title_3}</li>
            </ul>
          </div>

          <div className="text-end text-muted small d-flex align-items-center justify-content-end">
            <FaCalendarAlt className="me-2 text-secondary" />
            Submitted on: {new Date(submission.message.createdAt).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MySubmissions;

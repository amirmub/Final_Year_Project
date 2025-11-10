import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import StatsCard from "../../Components/StatsCard/StatsCard";
import QuickTitleCheck from "../../Components/QuickTitleCheck/QuickTitleCheck";
import SubmissionsTable from "../../Components/SubmissionsTable/SubmissionsTable";
import { FaFileAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function StudDashboard() {
  const submissions = [
    { title: "Machine Learning in Healthcare", department: "Computer Science", date: "Dec 15, 2024", status: "Approved", score: 18 },
    { title: "Climate Change Impact Analysis", department: "Environmental Science", date: "Dec 12, 2024", status: "Approved", score: 22 },
    { title: "Digital Marketing Strategy Framework", department: "Business Administration", date: "Dec 10, 2024", status: "Pending", score: 45 },
    { title: "Renewable Energy Solutions", department: "Engineering", date: "Dec 8, 2024", status: "Needs Review", score: 65 },
    { title: "Blockchain Applications", department: "Computer Science", date: "Dec 5, 2024", status: "Pending", score: 78 },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={9} lg={10} className="p-4 bg-light min-vh-100">
          <Header userName="Abebe Tadesse" />
          <Row className="mt-4 g-3">
                <Col md={3}><StatsCard title="My Submissions" value="3" icon={<FaFileAlt />} color="#007bff" /></Col>
                <Col md={3}><StatsCard title="Pending Review" value="1" icon={<FaClock />} color="#ffc107" /></Col>
                <Col md={3}><StatsCard title="Approved Titles" value="2" icon={<FaCheckCircle />} color="#28a745" /></Col>
                <Col md={3}><StatsCard title="Similarity Alerts" value="0" icon={<FaExclamationTriangle />} color="#dc3545" /></Col>
          </Row>
          <SubmissionsTable submissions={submissions} />
        </Col>
      </Row>
    </Container>
  );
}

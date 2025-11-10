import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import StatsCard from "../../../Components/StatsCard/StatsCard";
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaFileAlt } from "react-icons/fa";
import Header from "../../../Components/Header/Header";

function Dashboard() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="p-5" style={{ backgroundColor: "#f8f9fa", paddingTop: "800px" }}>
            <Row className="g-4">
              <Col md={3}> <StatsCard title="My Submissions" value="2" icon={<FaFileAlt />} color="#007bff" />
              </Col>

              <Col md={3}>
                <StatsCard  title="Pending Review"  value="1" icon={<FaClock />} color="#ffc107" />
              </Col>

              <Col md={3}>
                <StatsCard title="Approved Titles" value="2" icon={<FaCheckCircle />} color="#28a745"/>
              </Col>

              <Col md={3}>
                <StatsCard title="Similarity Alerts" value="0" icon={<FaExclamationTriangle />} color="#dc3545"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

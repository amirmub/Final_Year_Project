import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import StatsCard from "../../../Components/StatsCard/StatsCard";
import AnnouncementCard from "../../../Components/AnnouncementCard/AnnouncementCard";
import SkeletonLoader from "../../../Components/SkeletonLoader/SkeletonLoader";

import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFileAlt,
} from "react-icons/fa";

import Header from "../../../Components/Header/Header";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";

function Dashboard() {
  const authData = getAuth();
  const loginUser = authData?.token || "no token";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const fadeIn = {
    animation: "fadeIn 0.6s ease",
  };

  return (
    <>
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}
      </style>

      <Header />

      <Container fluid className="p-0"
        style={{
              backgroundColor: "#eef2f5",
              minHeight: "100vh",
            }}>
        <Row className="g-0">
          {/* Sidebar */}
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col
            md={9}
            lg={9}
            className="py-4 m-auto"
           
          >
            {/* Page Header */}
            <div
              className="mb-2 pb-3"
              style={{ ...fadeIn }}
            >
              <h3 className="fw-bold text-primary">Dashboard Overview</h3>
            </div>

            {/* Stats Section */}
            <Row className="g-4 mb-4">
              {loading ? (
                <>
                  <Col sm={6} lg={3}>
                    <SkeletonLoader />
                  </Col>
                  <Col sm={6} lg={3}>
                    <SkeletonLoader />
                  </Col>
                  <Col sm={6} lg={3}>
                    <SkeletonLoader />
                  </Col>
                  <Col sm={6} lg={3}>
                    <SkeletonLoader />
                  </Col>
                </>
              ) : (
                <>
                  <Col sm={6} lg={3}>
                    <StatsCard
                      title="My Submissions"
                      value="2"
                      icon={<FaFileAlt />}
                      color="#007bff"
                    />
                  </Col>

                  <Col sm={6} lg={3}>
                    <StatsCard
                      title="Pending Review"
                      value="1"
                      icon={<FaClock />}
                      color="#ffc107"
                    />
                  </Col>

                  <Col sm={6} lg={3}>
                    <StatsCard
                      title="Approved Titles"
                      value="2"
                      icon={<FaCheckCircle />}
                      color="#28a745"
                    />
                  </Col>

                  <Col sm={6} lg={3}>
                    <StatsCard
                      title="Similarity Alerts"
                      value="0"
                      icon={<FaExclamationTriangle />}
                      color="#dc3545"
                    />
                  </Col>
                </>
              )}
            </Row>

            {/* Announcements */}
            <div className="mt-5" style={fadeIn}>
              {/* <h5 className="fw-semibold text-secondary mb-3 text-center">
                Latest Announcements
              </h5> */}
              <AnnouncementCard />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

import { Col, Container, Row } from "react-bootstrap"; 
import StatsCard from "../../../Components/StatsCard/StatsCard";
import SkeletonLoader from "../../../Components/SkeletonLoader/SkeletonLoader";
import SuperAdminSidebar from "../../../Components/SuperAdminSidebar/SuperAdminSidebar";
import Header from "../../../Components/Header/Header";
import axios from "../../../utils/axios";

import { FaCheckCircle, FaUsers} from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";
import { useParams } from "react-router-dom";

function SuperDashboard() {

  const [loading, setLoading] = useState(false);
  const [titlesData, setTitlesData] = useState({
    total: 0,
    approved: 0,
    groupMembers: 0,
  });

  const fadeIn = { animation: "fadeIn 0.6s ease" };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      <Header />

      <Container fluid className="p-0" style={{ backgroundColor: "#eef2f5", minHeight: "100vh" }}>
        <Row className="g-0">
          <Col md={3} lg={2} className="p-0"><SuperAdminSidebar /></Col>

          <Col md={9} lg={9} className="py-4 m-auto">
            <div className="mb-2 pb-3" style={fadeIn}>
              <h3 className="fw-bold text-primary">Dashboard</h3>
            </div>

            <Row className="g-4 mb-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <Col key={i} sm={6} lg={4}>
                    <SkeletonLoader />
                  </Col>
                ))
              ) : (
                <>
                  <Col sm={6} lg={4}>
                    <StatsCard
                      title="Total Admins"
                      value={titlesData.total}
                      icon={<FaUsers />}
                      color="#007bff"
                    />
                  </Col>

                  <Col sm={6} lg={4}>
                    <StatsCard
                      title="Results"
                      value={titlesData.approved}
                      icon={<FaCheckCircle />}
                      color="#28a745"
                    />
                  </Col>

                  <Col sm={6} lg={4}>
                    <StatsCard
                      title="Group Members"
                      value={titlesData.groupMembers}
                      icon={<FaUsers />} 
                      color="#dc3545"
                    />
                  </Col>
                </>
              )}
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SuperDashboard;

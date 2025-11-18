import { Col, Container, Row } from "react-bootstrap"; 
import Sidebar from "../../../Components/Sidebar/Sidebar";
import StatsCard from "../../../Components/StatsCard/StatsCard";
import AnnouncementCard from "../../../Components/AnnouncementCard/AnnouncementCard";
import SkeletonLoader from "../../../Components/SkeletonLoader/SkeletonLoader";

import { FaCheckCircle, FaClock, FaExclamationTriangle, FaFileAlt } from "react-icons/fa";
import Header from "../../../Components/Header/Header";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";

function Dashboard() {
  const authData = getAuth();
  const token = authData?.token;
  const userId = authData?.id;

  const { id: titleIdParam } = useParams();
  const latestSubmissionId = localStorage.getItem(`latestSubmissionId_${userId}`);
  const titleId = titleIdParam || latestSubmissionId; // fallback

  const [loading, setLoading] = useState(true);
  const [titlesData, setTitlesData] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    similarityAlerts: 0,
  });

  const fadeIn = { animation: "fadeIn 0.6s ease" };

  useEffect(() => {
    const fetchUserTitle = async () => {
      if (!titleId) {
        console.warn("No titleId found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/users/${userId}/titles/${titleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const title = res.data.data; // single submission

        // Count non-empty titles
        const titleArray = [title.title_1, title.title_2, title.title_3];
        const totalTitles = titleArray.filter(t => t && t.trim() !== "").length;

        const approvedCount = titleArray.filter(t => t && title.status === "Approved").length;
        const pendingCount = titleArray.filter(t => t && title.status === "Pending").length;
        const similarityCount = titleArray.filter(t => t && title.similarityAlert).length;

        setTitlesData({
          total: totalTitles,
          approved: approvedCount,
          pending: pendingCount,
          similarityAlerts: similarityCount,
        });

        console.log("Fetched title:", res.data);
      } catch (error) {
        console.error(error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTitle();
  }, [userId, token, titleId]);


  return (
    <>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        `}
      </style>

      <Header />

      <Container fluid className="p-0" style={{ backgroundColor: "#eef2f5", minHeight: "100vh" }}>
        <Row className="g-0">
          <Col md={3} lg={2} className="p-0"><Sidebar /></Col>

          <Col md={9} lg={9} className="py-4 m-auto">
            <div className="mb-2 pb-3" style={fadeIn}>
              <h3 className="fw-bold text-primary">Dashboard Overview</h3>
            </div>

            <Row className="g-4 mb-4">
              {loading ? (
                [...Array(4)].map((_, i) => <Col key={i} sm={6} lg={3}><SkeletonLoader /></Col>)
              ) : (
                <>
                  <Col sm={6} lg={3}>
                    <StatsCard title="My Submissions" value={titlesData.total} icon={<FaFileAlt />} color="#007bff" />
                  </Col>
                  <Col sm={6} lg={3}>
                    <StatsCard title="Pending Review" value={titlesData.pending} icon={<FaClock />} color="#ffc107" />
                  </Col>
                  <Col sm={6} lg={3}>
                    <StatsCard title="Approved Titles" value={titlesData.approved} icon={<FaCheckCircle />} color="#28a745" />
                  </Col>
                  <Col sm={6} lg={3}>
                    <StatsCard title="Similarity Alerts" value={titlesData.similarityAlerts} icon={<FaExclamationTriangle />} color="#dc3545" />
                  </Col>
                </>
              )}
            </Row>

            <div className="mt-5" style={fadeIn}>
              <AnnouncementCard />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

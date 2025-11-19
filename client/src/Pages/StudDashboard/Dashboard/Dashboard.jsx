import { Col, Container, Row } from "react-bootstrap"; 
import Sidebar from "../../../Components/Sidebar/Sidebar";
import StatsCard from "../../../Components/StatsCard/StatsCard";
import AnnouncementCard from "../../../Components/AnnouncementCard/AnnouncementCard";
import SkeletonLoader from "../../../Components/SkeletonLoader/SkeletonLoader";

import { FaCheckCircle, FaUsers, FaFileAlt } from "react-icons/fa"; // Updated icon
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
  const titleId = titleIdParam || latestSubmissionId;

  const [loading, setLoading] = useState(true);
  const [titlesData, setTitlesData] = useState({
    total: 0,
    approved: 0,
    groupMembers: 0,
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

        const title = res.data.data;

        // Total titles
        const titleArray = [title.title_1, title.title_2, title.title_3];
        const totalTitles = titleArray.filter(t => t && t.trim() !== "").length;

        // Approved titles
        const approvedCount = title.status === "Approved" ? totalTitles : 0;

        // Group members count (from number field)
        const groupMembersCount = title.group_member ? Number(title.group_member) : 0;

        setTitlesData({
          total: totalTitles,
          approved: approvedCount,
          groupMembers: groupMembersCount,
        });

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
                [...Array(3)].map((_, i) => (
                  <Col key={i} sm={6} lg={4}>
                    <SkeletonLoader />
                  </Col>
                ))
              ) : (
                <>
                  <Col sm={6} lg={4}>
                    <StatsCard
                      title="Submitted Titles"
                      value={titlesData.total}
                      icon={<FaFileAlt />}
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
                      icon={<FaUsers />} // Updated icon here
                      color="#dc3545"
                    />
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

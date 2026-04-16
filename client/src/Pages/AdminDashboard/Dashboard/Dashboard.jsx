import { Col, Container, Row } from "react-bootstrap";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import StatsCard from "../../../Components/StatsCard/StatsCard";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFileAlt,
} from "react-icons/fa";
import Header from "../../../Components/Header/Header";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";

function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const auth = getAuth();
        const token = auth?.token;
        const userId = auth?.id;

        const res = await axios.get(`/users/${userId}/titles`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status === "success") {
          const data = res.data.message;
          console.log("Fetched Titles for Stats:", data);

          let pending = 0;
          let approved = 0;
          let rejected = 0;

          data.forEach((item) => {
            [item.title_1, item.title_2, item.title_3].forEach((t) => {
              if (!t) return;

              if (t.status === "pending") pending++;
              if (t.status === "approved") approved++;
              if (t.status === "rejected") rejected++;
            });
          });

          setStats({
            total: data.length * 3, // ✅ THIS IS THE FIX
            pending,
            approved,
            rejected,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="p-0">
            <AdminSidebar />
          </Col>

          {/* Main Content */}
          <Col
            md={9}
            lg={10}
            className="p-5"
            style={{
              backgroundColor: "#f4f6f9",
              minHeight: "100vh",
            }}
          >
            <h4 className="fw-bold mb-3 text-primary">Admin Dashboard</h4>
            <Row className="g-4">
              <Col sm={6} lg={6}>
                <StatsCard
                  title="Total Submissions"
                  value={stats.total} // ✅ CORRECT
                  icon={<FaFileAlt />}
                  color="#0d6efd"
                />
              </Col>

              <Col sm={6} lg={6}>
                <StatsCard
                  title="Pending Review"
                  value={stats.pending}
                  icon={<FaClock />}
                  color="#ffc107"
                />
              </Col>

              <Col sm={6} lg={6}>
                <StatsCard
                  title="Approved Titles"
                  value={stats.approved}
                  icon={<FaCheckCircle />}
                  color="#28a765"
                />
              </Col>

              <Col sm={6} lg={6}>
                <StatsCard
                  title="Rejected Titles"
                  value={stats.rejected}
                  icon={<FaExclamationTriangle />}
                  color="#dc3545"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

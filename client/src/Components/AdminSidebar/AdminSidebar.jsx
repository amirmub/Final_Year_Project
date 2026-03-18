import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUpload, FaBook, FaBell, FaQuestionCircle, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "../../utils/auth";

const Sidebar = () => {
  const location = useLocation();
  const auth = getAuth() || {};
  const { id: userId } = auth;

  const [latestSubmissionId, setLatestSubmissionId] = useState(
    localStorage.getItem(`latestSubmissionId_${userId}`) || "new"
  );

  // Update on localStorage changes (optional if you use events)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedId = localStorage.getItem(`latestSubmissionId_${userId}`);
      if (updatedId) setLatestSubmissionId(updatedId);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userId]);

  const mySubmissionPath = `/student/my-submissions/${latestSubmissionId}`;

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/admin/all-submissions", label: "All Submission", icon: <FaUpload /> },
    { path: "/admin/create-announcement", label: "Announcement", icon: <FaBell /> },
    { path: "/admin/setting", label: "Settings", icon: <FaCog  /> }
  ];

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <div
      className="d-flex flex-column vh-100 p-3 shadow-sm text-white"
      style={{
        background: "#5581BB",
        minWidth: "220px",
        minHeight: "80vh",
        position: isDesktop ? "fixed" : "sticky",
        top: isDesktop ? "68px" : "69px",
        left: 0,
        zIndex: 999,
      }}
    >
      <Nav className="flex-column gap-1">
        {navItems.map((item, index) => {
          // Determine actual path for My Submissions
          const path = item.label === "My Submissions" ? mySubmissionPath : item.path;

          return (
            <Nav.Item key={index}>
              <Link
                to={path}
                className={`d-flex align-items-center px-3 py-1 rounded text-decoration-none ${
                  isActive(item.path) ? "bg-white text-primary" : "text-light"
                }`}
                style={{ transition: "all 0.2s ease-in-out" }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                {item.label}
              </Link>
            </Nav.Item>
          );
        })}
      </Nav>

      <div
        style={{ position: "fixed", bottom: 15, left: 30 }}
        className="mt-auto text-center border-top pt-3 small text-light"
      >
        <p className="mb-0">© 2025 Title Detection</p>
      </div>
    </div>
  );
};

export default Sidebar;

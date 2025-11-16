import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUpload, FaBook, FaBell, FaQuestionCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "../../utils/auth";

const Sidebar = () => {
  const location = useLocation();
  const auth = getAuth() || {};
  const { id: userId } = auth;

  // Get the latest submission ID for the current user
  const latestSubmissionId = localStorage.getItem(`latestSubmissionId_${userId}`);

  // Always render My Submissions as /student/my-submissions/:id
  // If no submission exists yet, use 'new' as a placeholder ID
  const mySubmissionPath = latestSubmissionId
    ? `/student/my-submissions/${latestSubmissionId}`
    : `/student/my-submissions/new`;

  const navItems = [
    { path: "/student/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/student/submit-title", label: "Submit Title", icon: <FaUpload /> },
    { path: mySubmissionPath, label: "My Submissions", icon: <FaBook /> },
    { path: "/student/announcements", label: "Announcements", icon: <FaBell /> },
    { path: "/student/faq", label: "FAQ", icon: <FaQuestionCircle /> }
  ];

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {navItems.map((item, index) => (
          <Nav.Item key={index}>
            <Link
              to={item.path}
              className={`d-flex align-items-center px-3 py-1 rounded text-decoration-none ${
                location.pathname === item.path ? "bg-white text-primary" : "text-light"
              }`}
              style={{ transition: "all 0.2s ease-in-out" }}
            >
              <span className="me-3 fs-5">{item.icon}</span>
              {item.label}
            </Link>
          </Nav.Item>
        ))}
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

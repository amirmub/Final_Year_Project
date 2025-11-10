import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUpload, FaBook, FaBell, FaUser, FaQuestionCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/submit-title", label: "Submit Title", icon: <FaUpload /> },
    { path: "/my-submissions", label: "My Submissions", icon: <FaBook /> },
    { path: "/announcements", label: "Announcements", icon: <FaBell /> },
    { path: "/profile-settings", label: "Profile Settings", icon: <FaUser /> },
    { path: "/help-support", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  return (
    <div
      className="d-flex flex-column vh-100 p-3 shadow-sm text-white"
      style={{
        background: "linear-gradient(180deg, #2C74E0 0%, #1B4DA0 100%)",
        minWidth: "220px",
        minHeight: "80vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      {/* Logo / Title */}
      {/* <div className="mb-4 text-center border-bottom pb-3">
        <h5 className="fw-bold">🎓 Title Similarity</h5>
        <small style={{ color: "#cce0ff" }}>Detection System</small>
      </div> */}

      {/* Navigation */}
      <Nav className="flex-column gap-1">
        {navItems.map((item, index) => (
          <Nav.Item key={index}>
            <Link
              to={item.path}
              className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
                location.pathname === item.path
                  ? "bg-white text-primary shadow-sm "
                  : "text-light"
              }`}
              style={{
                transition: "all 0.2s ease-in-out",
              }}
            >
              <span className="me-3 fs-5">{item.icon}</span>
              {item.label}
            </Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Footer Section */}
      <div style={{position: "fixed", bottom: 15,left:30 }} className="mt-auto text-center border-top pt-3 small text-light">
        <p className="mb-0">© 2025 Title Detection</p>
      </div>
    </div>
  );
};

export default Sidebar;

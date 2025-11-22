import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../../assets/img/jimma_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "../../utils/auth";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Check login status and role
  useEffect(() => {
    const auth = getAuth();
    const token = auth?.token;
    const userRole = auth?.role;

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  // Dashboard role-based navigation
  const handleDashboardClick = () => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "student") {
      navigate("/student/dashboard");
    } else if (role === "superAdmin") {
      navigate("/super-admin/dashboard");
    } else {
      navigate("/login"); // fallback
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 px-4"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <a
          className="navbar-brand fw-bold text-primary position-relative"
          href="#"
          style={{ height: "60px" }}
        >
          <img
            src={img}
            alt="Logo"
            style={{
              height: "60px",
              width: "60px",
              position: "absolute",
              top: "0px",
              left: "10px",
            }}
          />
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#how-it-works">
                How it Works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#about">
                About
              </a>
            </li>
          </ul>

          {/* Right Buttons */}
          <div className="d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">

            {/* NOT LOGGED IN → show Login/Register */}
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button
                    className="btn ms-3"
                    style={{ background: "#408CF1", color: "#fff" }}
                  >
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="btn btn-outline-primary ms-3">
                    Register
                  </button>
                </Link>
              </>
            )}

            {/* LOGGED IN → Dashboard */}
            {isLoggedIn && (
              <button
                onClick={handleDashboardClick}
                className="btn ms-3"
                style={{ background: "#408CF1", color: "#fff" }}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

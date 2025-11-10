import { Link } from "react-router-dom";
import logo from "../../../assets/img/jimma_logo.png";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow p-1"
      style={{ backgroundColor: "#2B72DD", position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="container-fluid">
        {/* Left side - Logo and Title */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "50px", marginLeft: "10px" }}
          />
          <div className="text-white fw-bold" style={{ fontSize: "17px" }}>
            <small className="d-block">Title Similarity</small>
            <small className="d-block">Detection System</small>
          </div>
        </Link>

        {/* Toggler button (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="d-flex align-items-center mt-2 mt-lg-0">
            {/* User Avatar */}
            <div
              className="d-flex align-items-center bg-warning rounded-circle text-dark fw-bold me-2"
              style={{ width: "35px", height: "35px", justifyContent: "center" }}
            >
              AM
            </div>

            {/* User Info */}
            <div className="text-white me-3 text-center text-lg-start">
              <div className="fw-bold">Amir Mubarek</div>
              <small>Student</small>
            </div>

            {/* Logout Button */}
            <button className="btn btn-outline-light btn-sm">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

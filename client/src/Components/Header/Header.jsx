import { Link } from "react-router-dom";
import logo from "../../../assets/img/jimma_logo.png";
import { getAuth } from "../../utils/auth";

const Header = () => {
  const auth = getAuth();

  function logOut() {
    localStorage.removeItem("Token");
    window.location.reload();
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-1"
      style={{ backgroundColor: "#5581BB", position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="container-fluid">
        {/* Left side */}
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

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="d-flex align-items-center mt-2 mt-lg-0">

            {/* Avatar */}
            <div
              className="d-flex align-items-center bg-warning rounded-circle text-dark fw-bold me-2"
              style={{ width: "35px", height: "35px", justifyContent: "center" }}
            >
              {auth?.name ? auth.name.substring(0, 2).toUpperCase() : "NA"}
            </div>

            {/* User Info */}
            <div className="text-white me-3 text-center text-lg-start">
              <div className="fw-bold">
                {auth?.name || "Unknown User"}
              </div>
              <small>
                {auth?.role || "Unknown Role"}
              </small>
            </div>

            {/* Logout */}
            <button onClick={logOut} className="btn btn-outline-light btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

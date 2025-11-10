import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../assets/img/logo.jpg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2  px-4" style={{position: "sticky", top: 0, zIndex: 1000}}>
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
              height: "75px",
              width: "100px",
              position: "absolute",
              top: "-7px", // moves it upward
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

        {/* Navbar Links + Buttons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Links */}
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                How it Works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Contact
              </a>
            </li>
          </ul>

          {/* Right-Aligned Buttons */}
          <div className="d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">
            <Link to="/login"> <button className="btn btn-primary ms-3">Login</button></Link>
            <Link to="/register"><button className="btn btn-outline-primary ms-3">Register</button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

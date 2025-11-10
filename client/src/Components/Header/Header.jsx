import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg p-1 navbar-dark shadow " style={{ backgroundColor: "#2B72DD",position: "sticky", top: 0, zIndex: 1000 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left side - Logo and Title */}
        <Link to="/" className=" text-decoration-none">
        <h6 style={{ color: "#cce0ff", fontSize:"17px" }} className="navbar-brand fw-bold">
            🎓 Title Similarity <br />
            <span style={{ marginLeft: "30px" }}>Detection System</span>
        </h6>
      </Link>

        {/* Right side - Notifications, User and Logout */}
        <div className="d-flex align-items-center">

          {/* User Avatar */}
          <div className="d-flex align-items-center bg-warning rounded-circle text-dark fw-bold me-2" style={{ width: "35px", height: "35px", justifyContent: "center" }}>
            AB
          </div>

          {/* User Info */}
          <div className="text-white me-3" style={{ lineHeight: "1" }}>
            <div className="fw-bold">Abebe Tadesse</div>
            <small>Student</small>
          </div>

          {/* Logout Button */}
          <button className="btn btn-outline-light btn-sm">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

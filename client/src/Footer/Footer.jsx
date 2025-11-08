import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1550CC",
        color: "#e3f2fd",
        fontSize: "14.5px",
      }}
      className="pt-5 pb-3 mt-auto"
    >
      <Container>
        {/* Top Section */}
        <Row className="gy-4 text-center text-md-start">
          {/* Logo + Description */}
          <Col xs={12} md={3}>
            <h5 className="fw-bold text-white">JIMMA UNIVERSITY</h5>
            <p className="text-warning mb-1">AI-Powered Title Similarity</p>
            <p style={{ fontSize: "14px", color: "#d0e6ff" }}>
              Empowering students with advanced technology for academic
              excellence and integrity.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={3}>
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-light text-decoration-none d-block mb-1">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none d-block mb-1">Features</a></li>
              <li><a href="#" className="text-light text-decoration-none d-block mb-1">How it Works</a></li>
              <li><a href="#" className="text-light text-decoration-none d-block">About</a></li>
            </ul>
          </Col>

          {/* Resources */}
          <Col xs={6} md={3}>
            <h6 className="fw-bold text-white mb-3">Resources</h6>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-light text-decoration-none d-block mb-1">User Guide</a></li>
              <li><a href="#" className="text-light text-decoration-none d-block mb-1">Help & Support</a></li>
              <li><a href="#" className="text-light text-decoration-none d-block">Policy</a></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col xs={12} md={3}>
            <h6 className="fw-bold text-white mb-3">Contact</h6>
            <p className="mb-1">Jimma, Ethiopia</p>
            <p className="mb-1">
              Email:{" "}
              <a
                href="mailto:info@ju.edu.et"
                className="text-warning text-decoration-none"
              >
                info@ju.edu.et
              </a>
            </p>
            <p className="mb-1">
              Phone: <span className="text-warning">+251-91-111-1234</span>
            </p>
            <p className="mb-0">
              Office Hours: <span className="text-warning">9AM - 5PM</span>
            </p>
          </Col>
        </Row>

        <hr className="border-light my-4" />

        {/* Bottom Section */}
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6}>
            <p className="mb-0 small text-light">
              © 2025 Jimma University. All rights reserved.
            </p>
          </Col>
          <Col
            xs={12}
            md={6}
            className="text-md-end mt-3 mt-md-0 d-flex justify-content-center justify-content-md-end gap-3"
          >
            <a href="#" className="text-light fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light fs-5">
              <i className="bi bi-linkedin"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaBookOpen } from "react-icons/fa";
import logo from "../../../assets/img/logo.jpg";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container
      fluid
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2C74E0, #4F9EFF)",
      }}
    >
      <Row className="flex-grow-1 w-100">
        {/* Left Side */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center text-center text-white px-4"
          style={{
            backdropFilter: "blur(4px)",
            background: "rgba(44, 116, 224, 0.9)",
          }}
        >
          <Link to="/" className="mb-3">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "180px",
                marginBottom: "20px",
                // borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
          </Link>

          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Welcome Back
          </h2>
          <p style={{ color: "#f0f0f0", fontSize: "1.1rem" }}>
            Login to access the Title Similarity Detection System
          </p>

          {/* Book & Student Icons */}
          <div className="d-flex flex-row justify-content-center gap-4 mt-4">
            <div className="icon-box">
              <FaBookOpen size={40} className="text-warning icon-animate" />
            </div>
            <div className="icon-box">
              <FaUserGraduate size={40} className="text-light icon-animate" />
            </div>
          </div>

          <p className="mt-5 fst-italic" style={{ opacity: 0.9 }}>
            "We are in the Community"
          </p>
        </Col>

        {/* Right Side - Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-white"
          style={{ minHeight: "100vh" }}
        >
          <Form
            onSubmit={handleSubmit}
            className="p-4 shadow-lg rounded-4"
            style={{
              width: "100%",
              maxWidth: "450px",
              border: "1px solid #e5e5e5",
            }}
          >
            <h4 className="text-center mb-4 fw-bold text-primary">
              Login to Your Account
            </h4>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <small>
                <Link to="#" className="text-primary text-decoration-none">
                  Forgot Password?
                </Link>
              </small>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-3 fw-semibold"
              style={{
                background: "linear-gradient(to right, #2C74E0, #4F9EFF)",
                border: "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </Button>

            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary fw-semibold">
                Register
              </Link>
            </p>

            <small className="text-muted text-center d-block mt-3">
              Your information is protected and confidential 🔒
            </small>
          </Form>
        </Col>
      </Row>

      {/* Inline styles for icon hover animation */}
      <style>{`
        .icon-animate {
          transition: transform 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .icon-animate:hover {
          transform: scale(1.2);
          color: #ffd700 !important;
        }
      `}</style>
    </Container>
  );
}

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/jimma_logo.png";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        minHeight: "90vh",
        background: "linear-gradient(to right, #2C74E0, #4F9EFF)",
        fontSize: "15px",
      }}
    >
      <Row className="flex-grow-1 w-100">
        {/* Left Side */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center text-center text-white px-4"
          style={{
            backdropFilter: "blur(4px)",
            background: "#2E76E1",
          }}
        >
      {/* 🔹 Back to Home Icon with Modern Tooltip */}
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 150 }}
        overlay={
          <Tooltip
            id="back-home-tooltip"
            className=""
            style={{
              // backgroundColor: "#1c1c1c",
              color: "#fff",
              // padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              // boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Back to Home
          </Tooltip>
        }
      >
        <Link
          to="/"
          className="position-absolute"
          style={{
            top: "15px",
            left: "20px",
            color: "white",
            fontSize: "1.6rem",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.color = "#FFD43B";
            e.target.style.textShadow = "0 0 8px rgba(255, 212, 59, 0.7)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.color = "white";
            e.target.style.textShadow = "none";
          }}
        >
          <FaArrowLeft />
        </Link>
      </OverlayTrigger>

          <Link to="/" className="mb-3">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "180px",
                marginBottom: "20px",
                height: "150px",
                width: "150px",
              }}
            />
          </Link>

          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Join Our Community
          </h2>
          <p style={{ color: "#e0edff", fontSize: "1.1rem" }}>
            Create an account to submit and check project titles
          </p>

          <ul style={{ color: "#d0e6ff" }} className="list-unstyled">
            <li>✔ Create a personal profile</li>
            <li className="my-2">✔ Access previous projects</li>
            <li>✔ Receive announcements</li>
          </ul>

          <p className="mt-2 fst-italic" style={{ opacity: 0.9 }}>
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
            className="py-3 px-4 mt-2 shadow-lg rounded-4 small-placeholder"
            style={{
              width: "100%",
              maxWidth: "450px",
              border: "1px solid #e5e5e5",
              fontSize: "14.5px",
            }}
          >
            <h4 className="text-center mb-4 fw-bold text-primary">
              Create Your Account
            </h4>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" >
                Full Name *
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="py-1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="py-1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a strong password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="py-1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="py-1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to Terms & Conditions *"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-2 fw-semibold"
              style={{
                background: "linear-gradient(to right, #2C74E0, #4F9EFF)",
                border: "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Create Account
            </Button>

            <p className="text-center mt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-semibold">
                Login
              </Link>
            </p>

            <small className="text-muted text-center d-block mt-2">
              Your information is protected and confidential 🔒
            </small>
          </Form>
        </Col>
      </Row>

      {/* Inline animation styles */}

    </Container>
  );
}

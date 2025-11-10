import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/img/logo.jpg";
import { Link } from "react-router-dom";

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
    // Handle form submission here
  };

  return (
    <Container fluid className="d-flex">
      <Row className="flex-grow-1">
        {/* Left Side */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center text-center text-white"
          style={{ backgroundColor: "#2C74E0",height: "100vh" }}
        >
          <Link to="/">
            <img
            src={logo}
            alt="Logo"
            style={{ width: "180px", marginBottom: "20px" }}
          />
          </Link>
          <h2>Welcome Back</h2>
          <p style={{color : "#f0f0f0"}}>Login to access the Title Similarity Detection System</p>
          <ul className="list-unstyled">
            <li>✔ Submit project titles</li>
            <li>✔ Access previous projects</li>
            <li>✔ Receive announcements</li>
          </ul>
          <p className="mt-3"><em>"We are in the Community"</em></p>
        </Col>

        {/* Right Side - Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Form
            onSubmit={handleSubmit}
            className="p-4 shadow rounded"
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <h4 className="text-center mb-4">Login to Your Account</h4>

            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>



            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>
            <p className="text-center">
             Don't have an account? <a href="/login">Register</a>
            </p>
            <small className="text-muted text-center d-block">
              Your information is protected and confidential
            </small>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

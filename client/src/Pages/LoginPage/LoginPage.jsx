import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBookOpen, FaArrowLeft, FaEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../../assets/img/jimma_logo.png";
import axios from "../../utils/axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // iOS Toast Style
  const iosToastStyle = {
    borderRadius: "14px",
    background: "#fff",
    color: "#000",
    padding: "10px 16px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    fontSize: "14px",
    fontWeight: 500,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    const newErrors = {};
    if (!emailValue) newErrors.email = "Email required";
    if (!passwordValue) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please Input All Fields!", { style: iosToastStyle });
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

    toast.success("Logged in successfully!", { style: iosToastStyle });

    const { token, user } = response.data;

    // save token + user
    localStorage.setItem("Token", token);
    localStorage.setItem("User", JSON.stringify(user));

    // redirect based on role
    let path = "/login"; // fallback

    if (user.role === "student") path = "/student/dashboard";
    if (user.role === "admin") path = "/admin/dashboard";
    if (user.role === "superAdmin") path = "/super-admin/dashboard";

    setTimeout(() => {
      navigate(path);
    }, 1200);
  } 
  catch (error) {
    toast.error(error.response?.data?.message || "Login failed!", {
      style: iosToastStyle,
    });
    console.error("Login error:", error.response || error.message);
  }
  }

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
          style={{ backdropFilter: "blur(4px)", background: "#5A8BC5" }}
        >
          {/* Back Button */}
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 150 }}
            overlay={
              <Tooltip
                id="back-home-tooltip"
                style={{
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
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

          <Link to="/" className="mb-0">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            />
          </Link>

          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Welcome Back
          </h2>
          <p style={{ color: "#fff", fontSize: "1.1rem" }}>
            Login to access the Title Similarity Detection System
          </p>

          <div className="d-flex flex-row justify-content-center gap-4 mt-4">
            <div className="icon-box">
              <FaBookOpen size={40} className="text-warning icon-animate" />
            </div>
            <div className="icon-box">
              <FaUserGraduate size={40} className="text-light icon-animate" />
            </div>
          </div>

          <p className="mt-5 fst-italic" style={{ opacity: 1 }}>
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
            className="p-4 shadow-lg rounded-4 custom-input small-placeholder"
            style={{
              width: "100%",
              maxWidth: "450px",
              border: "1px solid #e5e5e5",
              fontSize: "14.5px",
            }}
          >
            <h4
              className="text-center mb-4 fw-bold"
              style={{ color: "#408CF1" }}
            >
              Login to Your Account
            </h4>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                ref={emailDom}
                onChange={handleInputChange}
                className={`py-2 ${errors.email ? "border border-danger" : ""}`}
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3 position-relative">
              <Form.Label className="fw-semibold ">Password *</Form.Label>
              <Form.Control
                className={`py-2 ${
                  errors.password
                    ? "border border-danger custom-input small-placeholder"
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                ref={passwordDom}
                onChange={handleInputChange}
              />
              <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", top: "38px", right: "12px", cursor: "pointer", color: "#6c757d" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Form.Group>

            {/* Remember Me */}
            <Form.Group className="mb-3 d-flex justify-content-end align-items-center">
              <small>
                <Link to="/forgot-password" className="text-primary text-decoration-none">
                  Forgot Password?
                </Link>
              </small>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-3 fw-semibold"
              style={{
                background:
                  "linear-gradient(to right,rgb(51, 116, 214), #4F9EFF)",
                border: "none",
                transition: "transform 0.2s ease-in-out",
              }}
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

      {/* iOS-style Toaster */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: iosToastStyle,
          success: { iconTheme: { primary: "#34C759", secondary: "#fff" } },
          error: { iconTheme: { primary: "#FF3B30", secondary: "#fff" } },
        }}
      />

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

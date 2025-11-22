import { useState } from "react";
import { Form, Button, Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; 
import logo from "../../../assets/img/jimma_logo.png";
import axios from "../../utils/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove error border when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();

    const nameValue = formData.fullName.trim();
    const emailValue = formData.email.trim();
    const passwordValue = formData.password;
    const confirmPasswordValue = formData.confirmPassword;

    // Validation
    const newErrors = {};
    if (!nameValue) newErrors.fullName = "Full name required";
    if (!emailValue) newErrors.email = "Email required";
    if (!passwordValue) newErrors.password = "Password required";
    if (!confirmPasswordValue) newErrors.confirmPassword = "Confirm password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please Input All Fields!", { style: iosToastStyle });
      return;
    }

    if (!termsChecked) {
      toast.error("You must agree to the Terms & Conditions!", { style: iosToastStyle });
      return;
    }

    try {
      await axios.post("/users", {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        passwordConfirm: confirmPasswordValue,
      });

      toast.success("User added successfully!", { style: iosToastStyle });
      setTimeout(() => navigate("/login"), 1600);

    } catch (error) {
      const errorMsg = error.response?.data.message || "Something went wrong!";
      toast.error(errorMsg, { style: iosToastStyle });
    }
  }

  return (
    <Container
      fluid
      className="d-flex"
      style={{ minHeight: "90vh", background: "linear-gradient(to right, #2C74E0, #4F9EFF)", fontSize: "15px" }}
    >
      <Row className="flex-grow-1 w-100">
        {/* Left Side */}
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center text-center text-white px-4"
          style={{ backdropFilter: "blur(4px)", background: "#5A8BC5" }}
        >
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 150 }}
            overlay={<Tooltip id="back-home-tooltip" style={{ color: "#fff", borderRadius: "6px", fontSize: "0.85rem" }}>Back to Home</Tooltip>}
          >
            <Link
              to="/"
              className="position-absolute"
              style={{ top: "15px", left: "20px", color: "white", fontSize: "1.6rem", transition: "all 0.3s ease-in-out" }}
              onMouseOver={(e) => { e.target.style.transform = "scale(1.2)"; e.target.style.color = "#FFD43B"; e.target.style.textShadow = "0 0 8px rgba(255, 212, 59, 0.7)"; }}
              onMouseOut={(e) => { e.target.style.transform = "scale(1)"; e.target.style.color = "white"; e.target.style.textShadow = "none"; }}
            >
              <FaArrowLeft />
            </Link>
          </OverlayTrigger>

          <Link to="/" className="mb-3">
            <img src={logo} alt="Logo" style={{ width: "150px", height: "150px", marginBottom: "20px" }} />
          </Link>

          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem", color : "#fff" }}>Join Our Community</h2>
          <p style={{ color: "#fff", fontSize: "1.1rem" }}>Create an account to submit and check project titles</p>
          <ul style={{ color: "#fff" }} className="list-unstyled">
            <li>✔ Create a personal profile</li>
            <li className="my-2">✔ Access previous projects</li>
            <li>✔ Receive announcements</li>
          </ul>
          <p className="mt-2 fst-italic" style={{ opacity: 1 }}>"We are in the Community"</p>
        </Col>

        {/* Right Side - Form */}
        <Col md={6} className="d-flex align-items-center justify-content-center bg-white" style={{ minHeight: "100vh" }}>
          <Form
            onSubmit={handleSubmit}
            className="py-3 px-4 mt-2 shadow-lg rounded-4 small-placeholder"
            style={{ width: "100%", maxWidth: "450px", border: "1px solid #e5e5e5", fontSize: "14.5px" }}
          >
            <h4 className="text-center mb-4 fw-bold " style={{ color: "#408CF1" }}>Create Your Account</h4>

            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border border-danger" : ""}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border border-danger" : ""}
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3 position-relative">
              <Form.Label className="fw-semibold">Password *</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border border-danger" : ""}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", top: "38px", right: "12px", cursor: "pointer", color: "#6c757d" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3 position-relative">
              <Form.Label className="fw-semibold">Confirm Password *</Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border border-danger" : ""}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: "absolute", top: "38px", right: "12px", cursor: "pointer", color: "#6c757d" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Form.Group>

           <Form.Check 
              type="checkbox" 
              label="I agree to Terms & Conditions *" 
              name="terms"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
          />
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-2 fw-semibold mt-3"
              style={{ background: "#408CF1", border: "none", transition: "transform 0.2s ease-in-out" }}
            >
              Create Account
            </Button>

            <p className="text-center mt-1">
              Already have an account? <Link to="/login" className="text-primary fw-semibold">Login</Link>
            </p>
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
    </Container>
  );
}

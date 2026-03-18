import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !passwordConfirm) {
      toast.error("All fields are required");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.patch(`/reset-password/${token}`, {
        password,
        passwordConfirm,
      });

      toast.success("Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Token is invalid or has expired"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toaster */}
      <Toaster position="top-center" autoClose={3000} />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F5F7FA",
          color: "#111827",
        }}
      >
        {/* Back to Home */}
        <div className="p-4">
          <Link
            to="/"
            style={{
              color: "#5B86C5",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            <FaHome className="me-2" />
            Back to Home
          </Link>
        </div>

        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={6} lg={5}>
              <div className="text-center mb-4">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    backgroundColor: "#E8F0FE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <FaLock size={26} color="#5B86C5" />
                </div>

                <h2 className="fw-bold">Reset Password</h2>
                <p style={{ color: "#6B7280" }}>
                  Enter a new password for your account
                </p>
              </div>

              <Card
                className="p-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                }}
              >
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#374151" }}>
                      New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #D1D5DB",
                        color: "#111827",
                        padding: "12px 16px",
                        borderRadius: 10,
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "#374151" }}>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      disabled={loading}
                      required
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #D1D5DB",
                        color: "#111827",
                        padding: "12px 16px",
                        borderRadius: 10,
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-100 fw-bold"
                    style={{
                      backgroundColor: "#5B86C5",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "12px",
                      borderRadius: 999,
                      fontSize: 16,
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    style={{
                      color: "#5B86C5",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Login
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
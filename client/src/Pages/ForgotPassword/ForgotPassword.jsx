import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
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
                <FaEnvelope size={26} color="#5B86C5" />
              </div>

              <h2 className="fw-bold">Forgot Password?</h2>
              <p style={{ color: "#6B7280" }}>
                Enter your email address and we'll send you a link to reset your
                password
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
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#374151" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
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
                  className="w-100 fw-bold"
                  style={{
                    backgroundColor: "#5B86C5",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "12px",
                    borderRadius: 999,
                    fontSize: 16,
                  }}
                >
                  Send Reset Link
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
  );
};

export default ForgotPassword;
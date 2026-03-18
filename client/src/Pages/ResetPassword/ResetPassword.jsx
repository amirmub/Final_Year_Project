import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // token from URL

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call will go here later
    // PATCH /reset-password/:token
  };

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
                  Reset Password
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

export default ResetPassword;
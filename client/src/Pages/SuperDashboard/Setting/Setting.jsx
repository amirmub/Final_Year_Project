import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaShieldAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SuperAdminSidebar/SuperAdminSidebar";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";

const Setting = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const auth = getAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.newPasswordConfirm) {
      return toast.error("Passwords do not match");
    }

    if (!auth?.token) {
      return toast.error("Session expired. Please login again.");
    }

    try {
      await axios.patch(
        "/update-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          newPasswordConfirm: form.newPasswordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success("Password changed. Please login again.");

      // Logout after password change
      setTimeout(() => {
        localStorage.removeItem("Token"); // your auth token key
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        minHeight: "100vh",
        paddingBottom: "30px",
      }}
    >
      <Header />
      <Toaster position="top-center" />

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>

          <Col md={9} lg={10} className="px-5">
            <Container className="my-4">
              <div className="mb-4">
                <h3 className="fw-bold">Settings</h3>
                <p className="text-muted">
                  Manage your application preferences and account settings
                </p>
              </div>

              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaShieldAlt className="text-primary me-2" size={20} />
                    <div>
                      <h5 className="fw-bold mb-0">Security</h5>
                      <small className="text-muted">
                        Manage your account security
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-semibold mb-1">Password & Login</h6>
                      <small className="text-muted">
                        Change your account password
                      </small>
                    </div>

                    <Button
                      variant="outline-primary"
                      className="rounded-pill px-4"
                      onClick={() => setShowModal(true)}
                    >
                      Change Password
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>

      {/* ================= MODAL ================= */}
      <Modal show={showModal} centered backdrop="static">
        <Modal.Body className="p-4">
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <FaLock className="text-primary me-2" size={20} />
              <div>
                <h5 className="fw-bold mb-0">Change Password</h5>
                <small className="text-muted">
                  Update your account password. Make sure to use a strong
                  password.
                </small>
              </div>
            </div>
            <Button variant="light" onClick={() => setShowModal(false)}>
              ✕
            </Button>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Current Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Your current password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  size="sm"
                />
                <Button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  size="sm"
                />
                <Button type="button" onClick={() => setShowNew(!showNew)}>
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Confirm New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  name="newPasswordConfirm"
                  placeholder="Confirm new password"
                  value={form.newPasswordConfirm}
                  onChange={handleChange}
                  required
                  size="sm"
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(false)}
                className="rounded-pill px-4"
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" className="rounded-pill px-4">
                Change Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Setting;
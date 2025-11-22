import { useState } from "react";
import Header from "../../../Components/Header/Header";
import SuperAdminSidebar from "../../../Components/SuperAdminSidebar/SuperAdminSidebar";
import {Col,Container,Row,Button,Table,Form,Modal} from "react-bootstrap";
import { FaSearch, FaSort, FaFilter, FaUserPlus } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AddAdminModal.css";
import  toast,{ Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";

function CreateAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "admin", // default
  });

  const [errors, setErrors] = useState({});

  // TOAST STYLE
  const iosToastStyle = {
    background: "#333",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 16px",
  };

  // INPUT HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const token = getAuth().token;

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // BASIC VALIDATION
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.password.trim()) newErrors.password = "Password required";
    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors", { style: iosToastStyle });
      console.log(newErrors);
  
      return;
    }

    try {
      setLoading(true);
      await axios.post("/users", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

      toast.success("Admin created successfully!", { style: iosToastStyle });
      setShowModal(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "admin",
      });

    } catch (err) {
      toast.error("Failed to create admin", { style: iosToastStyle });
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <style>
        {`
          @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(4px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
        `}
      </style>

      <Header />

      <Container
        fluid
        className="p-0"
        style={{ backgroundColor: "#eef2f5", minHeight: "100vh" }}
      >
        <Row className="g-0">
          <Col md={3} lg={2} className="p-0">
            <SuperAdminSidebar />
          </Col>

          <Col
            md={9}
            lg={10}
            className="py-4 px-5"
            style={{ animation: "fadeIn .35s ease" }}
          >
            <div className="mb-3 pb-2">
              <h3 className="fw-bold text-primary">Manage Admins</h3>
            </div>

            {/* SEARCH + SORT + FILTER + ADD */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex gap-2">
                {/* Search Field */}
                <div
                  className="d-flex align-items-center px-3"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    width: "280px",
                    height: "35px",
                    border: "1px solid #cfcfcf",
                  }}
                >
                  <FaSearch className="me-2 text-secondary" />
                  <Form.Control
                    type="text"
                    placeholder="Search admin..."
                    style={{
                      background: "transparent",
                      border: "none",
                      boxShadow: "none",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Sort Button */}
                <Button
                  variant=""
                  className="px-3 d-flex align-items-center"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #cfcfcf",
                    height: "35px",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  <FaSort className="me-2" /> Sort
                </Button>

                {/* Filter Button */}
                <Button
                  variant=""
                  className="px-3 d-flex align-items-center"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #cfcfcf",
                    height: "35px",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  <FaFilter className="me-2" /> Filter
                </Button>
              </div>

              {/* Add Staff */}
              <Button
                onClick={() => setShowModal(true)}
                className="px-3 d-flex align-items-center"
                style={{
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: "#0d6efd",
                  border: "none",
                  fontSize: "15px",
                }}
              >
                <FaUserPlus className="me-2" /> Add Admin
              </Button>
            </div>

            {/* TABLE */}
            <div
              className="p-0 bg-white"
              style={{
                borderRadius: "10px",
                border: "1px solid #ddd",
                overflow: "hidden",
              }}
            >
              <Table hover responsive className="m-0 text-center">
                <thead style={{ background: "#f8f9fa" }}>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date Added</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan="6" className="py-4 text-secondary">
                      No admin members found.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <>
              {/*ADD STAFF POPUP MODAL */}
              <div>

      <Toaster position="top-center" />

      {/* MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        backdrop="static"
        dialogClassName="slide-up-modal"
      >
        <Modal.Body
          style={{
            background: "#EEF2F5",
            color: "#000",
            borderRadius: "12px",
            padding: "30px",
            border: "1px solid #e5e5e5",
          }}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 className="fw-bold text-primary">Add New Admin</h3>
              <p className="text-muted">Create a new admin for this System.</p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "30px",
                color: "#777",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* PERSONAL */}
            <h6 className="fw-bold mt-3 text-secondary">PERSONAL INFORMATION</h6>

            <div className="mt-3">
              {/* FULL NAME */}
              <label className="fw-semibold">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="form-control mb-1"
                style={{
                  background: "#f9f9f9",
                  borderRadius: "8px",
                  border: "1px solid #dcdcdc",
                  height: "40px",
                }}
              />
              {errors.name && <p className="text-danger" style={{fontSize : "12px", margin: "0", padding : "0"}}>{errors.name}</p>}

              <div className="row mt-2">
                {/* EMAIL */}
                <div className="col-md-6">
                  <label className="fw-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="form-control mb-1"
                    style={{
                      background: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #dcdcdc",
                      height: "40px",
                    }}
                  />
                  {errors.email && <p className="text-danger" style={{fontSize : "12px", margin: "0", padding : "0"}}>{errors.email}</p>}
                </div>

                {/* ROLE */}
                <div className="col-md-6">
                  <label className="fw-semibold">Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control"
                    style={{
                      background: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #dcdcdc",
                      height: "40px",
                    }}
                  >
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <h6 className="fw-bold mt-3 text-secondary">ACCOUNT SECURITY</h6>

            <div className="row mt-2">

              {/* PASSWORD */}
              <div className="col-md-6 position-relative">
                <label className="fw-semibold">Password *</label>
                <div
                  className="d-flex align-items-center mb-1"
                  style={{
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    border: "1px solid #dcdcdc",
                    height: "40px",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="form-control"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  />
                  <span
                    onClick={togglePassword}
                    style={{
                      cursor: "pointer",
                      color: "#888",
                      position: "absolute",
                      right: 25,
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p className="text-danger" style={{fontSize : "12px", margin: "0", padding : "0"}}>{errors.password}</p>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="col-md-6 position-relative">
                <label className="fw-semibold">Confirm Password *</label>
                <div
                  className="d-flex align-items-center mb-1"
                  style={{
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    border: "1px solid #dcdcdc",
                    height: "40px",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="form-control"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  />
                  <span
                    onClick={toggleConfirmPassword}
                    style={{
                      cursor: "pointer",
                      color: "#888",
                      position: "absolute",
                      right: 25,
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.passwordConfirm && (
                  <p className="text-danger" style={{fontSize : "12px", margin: "0", padding : "0"}}>{errors.passwordConfirm}</p>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn me-2"
                onClick={() => setShowModal(false)}
                style={{
                  background: "#e9ecef",
                  color: "#333",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  borderRadius: "8px",
                  minWidth: "140px",
                }}
              >
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateAdmin;

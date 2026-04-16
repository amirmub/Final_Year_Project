import { useEffect, useState } from "react";
import Header from "../../../Components/Header/Header";
import SuperAdminSidebar from "../../../Components/SuperAdminSidebar/SuperAdminSidebar";
import {Col,Container,Row,Button,Table,Form,Modal} from "react-bootstrap";
import { FaSearch, FaSort, FaFilter, FaUserPlus, FaSave, FaTimes } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AddAdminModal.css";
import  toast,{ Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import Swal from "sweetalert2";

function CreateAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin,setShowAdmin] = useState([])
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "admin", // default
  });

  // SEARCH / SORT / FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest
  const [filterRole, setFilterRole] = useState("all"); // all | admin

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5;

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  // APPLY SEARCH + FILTER + SORT
const filteredAdmins = showAdmin
  .filter((admin) => {
    const name = admin.name?.toLowerCase() || "";
    const email = admin.email?.toLowerCase() || "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  })
  .filter((admin) => {
    if (filterRole === "all") return true;
    return admin.role === filterRole;
  })
  .sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

// PAGINATION AFTER FILTERING
const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);



  const [errors, setErrors] = useState({});
  
  const token = getAuth().token;

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
        setCurrentPage(1); // go to first page
        fetchAdmins();
        setShowModal(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "admin",
      });
      fetchAdmins();

    } catch (err) {
      toast.error("Failed to create admin", { style: iosToastStyle });
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  // fetch only admins
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`/users`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data.msg);
      // Keep only admins
      const onlyAdmins = res.data.msg
        .filter((user) => user.role === "admin")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first

      setShowAdmin(onlyAdmins);

      } catch (error) {
        toast.error("Failed to load admin", { style: iosToastStyle });
        console.log(error);
        
      }
  }

    useEffect(() =>{
      fetchAdmins();
    },[]);
    
const [editAdminId, setEditAdminId] = useState(null); // stores the ID being edited
const [editFormData, setEditFormData] = useState({ name: "", email: "" });

// Start editing
const handleEdit = (admin) => {
  setEditAdminId(admin._id);
  setEditFormData({ name: admin.name, email: admin.email });
};

// Cancel editing
const handleCancelEdit = () => {
  setEditAdminId(null);
  setEditFormData({ name: "", email: "" });
};

// Save edited data
const handleSaveEdit = async (id) => {
  try {
    const res = await axios.put(`/users/${id}`, editFormData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Admin updated successfully!", { style: iosToastStyle });
    handleCancelEdit();
    fetchAdmins();
  } catch (err) {
    toast.error("Failed to update admin", { style: iosToastStyle });
    console.log(err);
  }
};

// Handle delete with professional popup
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Admin deleted successfully!", { style: iosToastStyle });
        fetchAdmins();
      } catch (err) {
        toast.error("Failed to delete admin", { style: iosToastStyle });
        console.log(err);
      }
    }
  });
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
        style={{ backgroundColor: "#eef2f5", minHeight: "88vh" }}
      >
        <Row className="g-0">
          <Col md={3} lg={2} className="p-0">
            <SuperAdminSidebar />
          </Col>

          <Col
            md={9}
            lg={10}
            className="pt-4 px-5"
            style={{ animation: "fadeIn .35s ease", height : "70vh" }}
          >
            <div className="mb-2 pb-1">
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
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page
  }}
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
  onClick={() => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  }}
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
  <FaSort className="me-2" />
  {sortOrder === "newest" ? "Newest" : "Oldest"}
</Button>
                {/* Filter Button */}
<Form.Select
  value={filterRole}
  onChange={(e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  }}
  style={{
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #cfcfcf",
    height: "35px",
    width: "130px",
    fontSize: "14px",
  }}
>
  <option value="all">All</option>
  <option value="admin">Admin</option>
</Form.Select>
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
          <Table 
            hover 
            responsive 
            className="admin-table shadow-sm"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              background: "#ffffff",
              marginBottom : "0px"
            }}
          >
        <thead style={{ background: "#f1f3f5", color: "#343a40" }}>
          <tr>
            <th style={{ padding: "14px" }}>#</th>
            <th style={{ padding: "14px" }}>Name</th>
            <th style={{ padding: "14px" }}>Email</th>
            <th style={{ padding: "14px" }}>Role</th>
            <th style={{ padding: "14px" }}>Date Added</th>
            <th style={{ padding: "14px" }}>Action</th>
          </tr>
        </thead>

       <tbody>
          {currentAdmins.length > 0 ? (
            currentAdmins.map((admin, index) => (
              <tr key={admin._id} style={{ verticalAlign: "middle" }}>
                <td>{indexOfFirstAdmin + index + 1}</td>

                {/* Name */}
                <td style={{padding : "1px"}}>
                  {editAdminId === admin._id ? (
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, name: e.target.value })
                      }
                      className="form-control form-control-sm"
                      style={{ borderRadius: "8px", border: "1px solid #999" }}
                    />
                  ) : (
                    admin.name
                  )}
                </td>

                {/* Email */}
                <td style={{padding : "14px"}}>
                  {editAdminId === admin._id ? (
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, email: e.target.value })
                      }
                      className="form-control form-control-sm"
                      style={{ borderRadius: "8px", border: "1px solid #999" }}
                    />
                  ) : (
                    <span className="text-muted">{admin.email}</span>
                  )}
                </td>

                {/* Role */}
                <td style={{padding : "14px"}}>
                  <span className="badge" style={{ background: "#4c6ef5" }}>
                    {admin.role}
                  </span>
                </td>

                {/* Date */}
                <td style={{padding : "14px"}}>{new Date(admin.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td style={{padding : "14px"}}>
                  {editAdminId === admin._id ? (
                    <>
                      <FaSave
                        size={20}
                        style={{ cursor: "pointer", color: "#2b8a3e", marginRight: "10px" }}
                        title="Save"
                        onClick={() => handleSaveEdit(admin._id)}
                      />
                      <FaTimes
                        size={20}
                        style={{ cursor: "pointer", color: "#d6336c" }}
                        title="Cancel"
                        onClick={handleCancelEdit}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        size={19}
                        style={{ cursor: "pointer", color: "#1971c2", marginRight: "10px" }}
                        title="Edit"
                        onClick={() => handleEdit(admin)}
                      />
                      <FaTrash
                        size={18}
                        style={{ cursor: "pointer", color: "#e03131" }}
                        title="Delete"
                        onClick={() => handleDelete(admin._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-dark text-center">
                No admin members found.
              </td>
            </tr>
          )}
        </tbody>


        </Table>
        {/* pagination */}
       {filteredAdmins.length > adminsPerPage && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          {/* Previous Button */}
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{ borderRadius: "6px", minWidth: "70px" }}
          >
            Previous
          </Button>

          {/* Current Page Info */}
          <span
            className="align-self-center"
            style={{ fontWeight: 500 }}
          >
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{ borderRadius: "6px", minWidth: "70px" }}
          >
            Next
          </Button>
        </div>
      )}
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

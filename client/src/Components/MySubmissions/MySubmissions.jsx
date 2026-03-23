import { useEffect, useState } from "react";
import { Table, Button, Spinner, Form, Badge } from "react-bootstrap";
import { FaEdit, FaSave, FaUser, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import axios from "../../utils/axios";
import { toast, Toaster } from "react-hot-toast";
import { getAuth } from "../../utils/auth";
import { useParams } from "react-router-dom";

const MySubmissions = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({}); // Track which field is being edited
  const [updatedTitles, setUpdatedTitles] = useState({});

  const { id } = useParams(); 
  const auth = getAuth() || {};
  const { id: userId } = auth;
  const token = auth.token;

  const fetchSubmission = async () => {
    try {
      const res = await axios.get(`/users/${userId}/titles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmission(res.data.data);
      setUpdatedTitles({
        title_1: res.data.data.title_1,
        title_2: res.data.data.title_2,
        title_3: res.data.data.title_3,
      });
      console.log(res);
      
    } catch (error) {
      console.error(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleChange = (field, value) => {
    setUpdatedTitles({ ...updatedTitles, [field]: value });
  };

  const handleSave = async (field) => {
    try {
      const res = await axios.put(
        `/users/${userId}/titles/${id}`,
        { [field]: updatedTitles[field] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmission(res.data.data);
      setEditing({ ...editing, [field]: false });
      toast.success("Title updated successfully!");
      console.log(res);
      
    } catch (error) {
      toast.error("Failed to update title.");
      console.log(error);
      
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge bg="success">Approved</Badge>;
      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="warning" text="dark">Pending Review</Badge>;
    }
  };

  if (loading)
    return (
      <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: "87vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your submission...</p>
      </div>
    );

  if (!submission)
    return (
      <div className="text-center" style={{ height: "87vh" }}>
        <h5>No submission found.</h5>
      </div>
    );
    
    return (
      <div className="mt-4 h-100" >
      <Toaster position="top-center"/>

      <h4 className="mb-3 text-primary">My Submission</h4>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaUser className="me-2 text-secondary" />
          <strong>{submission.name}</strong>
        </div>
        <div className="d-flex align-items-center">
          <FaBuilding className="me-2 text-secondary" />
          <span className="me-4">{submission.department}</span>
          {getStatusBadge(submission.status || "Pending")}
        </div>
      </div>

      <Table bordered hover responsive className="bg-light rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {["title_1", "title_2", "title_3"].map((field, index) => (
            <tr key={field}>
              <td>{index + 1}</td>
              <td>
                {editing[field] ? (
                  <Form.Control
                    value={updatedTitles[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                ) : (
                  submission[field]
                )}
              </td>
              <td>
                {editing[field] ? (
                  <Button size="sm" variant="success" onClick={() => handleSave(field)}>
                    <FaSave />
                  </Button>
                ) : (
                  <Button size="sm" variant="primary" onClick={() => handleEdit(field)}>
                    <FaEdit />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end text-muted small mt-3">
        <FaCalendarAlt className="me-2" />
        Submitted on: {new Date(submission.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default MySubmissions;
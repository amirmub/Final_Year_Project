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
  const [editing, setEditing] = useState({});
  const [updatedTitles, setUpdatedTitles] = useState({});

  const { id } = useParams();
  const auth = getAuth() || {};
  const { id: userId } = auth;
  const token = auth.token;

  // ✅ FETCH DATA
  const fetchSubmission = async () => {
    if (!id || id === "new") return;
    try {
      const res = await axios.get(`/users/${userId}/titles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;

      setSubmission(data);

      // ✅ ensure safe structure
      setUpdatedTitles({
        title_1: data.title_1 || { text: "", status: "pending", note: "" },
        title_2: data.title_2 || { text: "", status: "pending", note: "" },
        title_3: data.title_3 || { text: "", status: "pending", note: "" },
      });

    } catch (error) {
      console.error(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!id || id === "new") {
    setLoading(false);
    return;
  }

  fetchSubmission();
}, [id]);

  // ✅ EDIT HANDLER
  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  // ✅ CHANGE HANDLER (nested object)
  const handleChange = (field, value) => {
    setUpdatedTitles({
      ...updatedTitles,
      [field]: value,
    });
  };

  // ✅ SAVE HANDLER
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
    } catch (error) {
      toast.error("Failed to update title.");
      console.log(error);
    }
  };

  // ✅ STATUS BADGE PER TITLE
  const getTitleStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">Approved</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };

  // ✅ LOADING
  if (loading)
    return (
      <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: "87vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your submission...</p>
      </div>
    );

  // ✅ NO DATA
  if (!submission)
    return (
      <div className="text-center" style={{ height: "87vh" }}>
        <h5>No submission found.</h5>
      </div>
    );

  return (
    <div className="mt-4 h-100">
      <Toaster position="top-center" />

      <h4 className="mb-3 text-primary">My Submission</h4>

      {/* HEADER */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaUser className="me-2 text-secondary" />
          <strong>{submission.name}</strong>
        </div>

        <div className="d-flex align-items-center">
          <FaBuilding className="me-2 text-secondary" />
          <span>{submission.department}</span>
        </div>
      </div>

      {/* TABLE */}
      <Table bordered hover responsive className="bg-light rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {["title_1", "title_2", "title_3"].map((field, index) => (
            <tr key={field}>
              <td>{index + 1}</td>

              {/* TITLE TEXT */}
              <td style={{fontSize: "14px"}}>
                {editing[field] ? (
                  <Form.Control
                    value={updatedTitles[field]?.text || ""}
                    onChange={(e) =>
                      handleChange(field, {
                        ...updatedTitles[field],
                        text: e.target.value,
                      })
                    }
                  />
                ) : (
                  submission[field]?.text || "No title"
                )}
              </td>

              {/* STATUS */}
              <td>
                {getTitleStatusBadge(submission[field]?.status)}
              </td>

              {/* NOTE */}
              <td style={{fontSize: "14px"}}>
                {submission[field]?.note ? (
                  <span >{submission[field]?.note}</span>
                ) : (
                  <span className="text-muted">No Comment</span>
                )}
              </td>

              {/* ACTION */}
              <td>
                {editing[field] ? (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleSave(field)}
                  >
                    <FaSave />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleEdit(field)}
                  >
                    <FaEdit />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* FOOTER */}
      <div className="text-end text-muted small mt-3">
        <FaCalendarAlt className="me-2" />
        Submitted on: {new Date(submission.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default MySubmissions;
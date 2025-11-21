import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import axios from "../../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import { getAuth } from "../../../utils/auth";
import SkeletonLoader from "../../../Components/SkeletonLoader/SkeletonLoader";

function CreateAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADD STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // UPDATE STATE
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // DELETE STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = getAuth().token;

  // FETCH ANNOUNCEMENTS 
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("/announcement", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = res.data.message.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAnnouncements(sorted);    
    } catch (error) {
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ADD ANNOUNCEMENT 
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title || !description) return toast.error("All fields required");

    try {
      await axios.post(
        "/announcement",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Announcement added");
      setTitle("");
      setDescription("");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to add announcement");
    }
  };

  // START EDIT
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // SAVE UPDATE
  const saveUpdate = async (id) => {
    try {
      await axios.put(
        `/announcement/${id}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Announcement updated");
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  //  OPEN DELETE MODAL 
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // DELETE ANNOUNCEMENT
  const deleteAnnouncement = async () => {
    try {
      await axios.delete(`/announcement/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Announcement deleted");
      setShowDeleteModal(false);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <Toaster />

      <Header />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <AdminSidebar />
          </Col>

          <Col
            md={9}
            lg={10}
            className="px-5 py-4"
            style={{ backgroundColor: "#f4f6f9", minHeight: "88vh" }}
          >
            <h3 className="fw-bold mb-3" style={{color : "#0044AB"}}>Manage Announcements</h3>

            {/* ADD ANNOUNCEMENT FORM */}
            <div className="bg-white p-4 shadow-sm rounded mb-4">
              <Form onSubmit={handleAdd}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
                  Add Announcement
                </Button>
              </Form>
            </div>

            {/* ANNOUNCEMENTS LIST */}
            <div className="bg-white p-4 shadow-sm rounded">
              <h5 className="mb-3">All Announcements</h5>

              {loading ? (
                <SkeletonLoader />
              ) : announcements.length === 0 ? (
                <p className="text-muted">No announcements found</p>
              ) : (
                announcements.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 mb-3 border rounded bg-light"
                  >
                    {editingId === item._id ? (
                      <>
                        <input
                          className="form-control mb-2"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <textarea
                          className="form-control mb-2"
                          rows={2}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        ></textarea>

                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => saveUpdate(item._id)}
                        >
                          Save
                        </Button>
                        <Button variant="secondary" size="sm" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <h6 className="fw-bold">{item.title}</h6>
                        <p className="text-muted">{item.description}</p>

                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => startEdit(item)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => confirmDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* CONFIRM DELETE MODAL */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this announcement?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAnnouncement}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateAnnouncement;

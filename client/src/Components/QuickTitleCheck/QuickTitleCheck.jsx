import { useRef, useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function QuickTitleCheck() {
  const leaderNameRef = useRef();
  const departmentRef = useRef();
  const title1Ref = useRef();
  const title2Ref = useRef();
  const title3Ref = useRef();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = getAuth() || {};
  const { token, id: userId } = auth;

  const iosToastStyle = {
    borderRadius: "14px",
    background: "#fff",
    color: "#000",
    padding: "10px 16px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    fontSize: "14px",
    fontWeight: 500,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !leaderNameRef.current.value ||
      !departmentRef.current.value ||
      !title1Ref.current.value ||
      !title2Ref.current.value ||
      !title3Ref.current.value
    ) {
      return toast.error("Please fill in all fields", { style: iosToastStyle });
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/titles",
        {
          user: userId, // associate submission with logged-in user
          name: leaderNameRef.current.value,
          department: departmentRef.current.value,
          title_1: title1Ref.current.value,
          title_2: title2Ref.current.value,
          title_3: title3Ref.current.value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Title submitted successfully", { style: iosToastStyle });

      // Save latest submission ID per user in localStorage
      localStorage.setItem(`latestSubmissionId_${userId}`, res.data.data.title._id);

      // Reset form
      leaderNameRef.current.value = "";
      departmentRef.current.value = "";
      title1Ref.current.value = "";
      title2Ref.current.value = "";
      title3Ref.current.value = "";

      // Navigate to the newly submitted title
      setTimeout(() => {
        navigate(`/student/my-submissions/${res.data.data.title._id}`);
      }, 1200);
    } catch (error) {
      console.error(error.response || error.message);
      toast.error("Failed to submit! Try again", { style: iosToastStyle });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <Card className="border-0 shadow-lg mt-2 p-4 rounded-4">
        <div className="d-flex align-items-center mb-2">
          <h5 className="fw-bold text-primary m-0 flex-grow-1">📘 Submit Your Title</h5>
        </div>

        <Form onSubmit={handleSubmit} className="mt-1">
          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Group Leader Name</Form.Label>
            <Form.Control ref={leaderNameRef} placeholder="Enter full name" className="custom-input" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Select Department</Form.Label>
            <Form.Select ref={departmentRef} className="custom-select">
              <option value="">Select Department</option>
              <option>Computer Science</option>
              <option>Information Science</option>
              <option>Information Technology</option>
              <option>Software Engineering</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Project Title 1</Form.Label>
            <Form.Control ref={title1Ref} placeholder="Project title 1" className="custom-input" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Project Title 2</Form.Label>
            <Form.Control ref={title2Ref} placeholder="Project title 2" className="custom-input" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Project Title 3</Form.Label>
            <Form.Control ref={title3Ref} placeholder="Project title 3" className="custom-input" />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading} className="w-100 py-2 mt-2 fw-semibold shadow-sm">
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : "Submit"}
          </Button>
        </Form>
      </Card>
    </>
  );
}

export default QuickTitleCheck;

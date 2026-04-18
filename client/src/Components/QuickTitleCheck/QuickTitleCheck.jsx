import { useRef, useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function QuickTitleCheck() {
  const leaderNameRef = useRef();
  const departmentRef = useRef();
  const groupRef = useRef();
  const title1Ref = useRef();
  const title2Ref = useRef();
  const title3Ref = useRef();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = getAuth() || {};
  const { token, id: userId } = auth;

  const iosToastStyle = {
    borderRadius: "12px",
    background: "#fff",
    color: "#000",
    padding: "8px 12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
    fontSize: "13px",
    fontWeight: 500,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !leaderNameRef.current.value ||
      !departmentRef.current.value ||
      !groupRef.current.value ||
      !title1Ref.current.value ||
      !title2Ref.current.value ||
      !title3Ref.current.value ||
      !fileRef.current.files[0]
    ) {
      return toast.error("Please fill in all fields", { style: iosToastStyle });
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", leaderNameRef.current.value);
      formData.append("department", departmentRef.current.value);
      formData.append("group_member", groupRef.current.value);
      formData.append("title_1", title1Ref.current.value);
      formData.append("title_2", title2Ref.current.value);
      formData.append("title_3", title3Ref.current.value);

      // ✅ FILE
      formData.append("pdf", fileRef.current.files[0]);
      const res = await axios.post(`/users/${userId}/titles`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // 🔥 REQUIRED
        },
      });

      toast.success("Title submitted successfully", { style: iosToastStyle });

      localStorage.setItem(`latestSubmissionId_${userId}`, res.data.data._id);

      leaderNameRef.current.value = "";
      departmentRef.current.value = "";
      groupRef.current.value = "";
      title1Ref.current.value = "";
      title2Ref.current.value = "";
      title3Ref.current.value = "";
      fileRef.current.value = "";

      setTimeout(() => {
        navigate(`/student/my-submissions/${res.data.data._id}`);
      }, 1000);
    } catch (error) {
      console.error(error.response || error.message);
      toast.error("Failed to submit! Try again", { style: iosToastStyle });
    } finally {
      setLoading(false);
    }
  };
  const fileRef = useRef();

  return (
    <>
      <Toaster position="top-center" />

      <Card className="border-0 shadow mt-0 pt-3 px-4 pb-1 rounded-3">
        <div className="d-flex align-items-center mb-2">
          {/* <h5 className="fw-bold text-primary m-0 flex-grow-1" style={{ fontSize: "1.2rem" }}>
            Submit Your Title
          </h5> */}
        </div>

        <Form onSubmit={handleSubmit} className="mt-0">
          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
              Group Leader Name
            </Form.Label>
            <Form.Control
              ref={leaderNameRef}
              placeholder="Enter full name"
              className="custom-input"
              style={{ fontSize: "0.85rem", padding: "6px 10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
              Select Department
            </Form.Label>
            <Form.Select
              ref={departmentRef}
              className="custom-select"
              style={{ fontSize: "0.85rem", padding: "6px 10px" }}
            >
              <option value="">Select Department</option>
              <option>Computer Science</option>
              <option>Information Science</option>
              <option>Information Technology</option>
              <option>Software Engineering</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
              Group Members
            </Form.Label>

            <div className="position-relative">
              <Form.Control
                ref={groupRef}
                type="number"
                min="0"
                max="5"
                defaultValue="0"
                className="custom-input"
                style={{ fontSize: "0.85rem", padding: "6px 40px 6px 10px" }}
              />
              <div
                className="d-flex position-absolute top-0 end-0 h-100"
                style={{ gap: "2px", padding: "4px" }}
              >
                <Button
                  variant="outline-secondary"
                  className="px-2 py-0"
                  style={{
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                  onClick={() => {
                    let current = Number(groupRef.current.value || 0);
                    if (current > 0) groupRef.current.value = current - 1;
                  }}
                >
                  –
                </Button>

                <Button
                  variant="outline-secondary"
                  className="px-2 py-0"
                  style={{
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                  onClick={() => {
                    let current = Number(groupRef.current.value || 0);
                    if (current < 5) groupRef.current.value = current + 1;
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
              Upload Max file size: 5 MB (PDF only)
            </Form.Label>

            <Form.Control
              type="file"
              accept="application/pdf"
              ref={fileRef}
              className="custom-input"
              style={{ fontSize: "0.85rem", padding: "6px 10px" }}
            />
          </Form.Group>

          {[title1Ref, title2Ref, title3Ref].map((ref, idx) => (
            <Form.Group key={idx} className="mb-2">
              <Form.Label
                className="fw-semibold"
                style={{ fontSize: "0.95rem" }}
              >
                Project Title {idx + 1}
              </Form.Label>
              <Form.Control
                ref={ref}
                placeholder={`Project title ${idx + 1}`}
                className="custom-input"
                style={{ fontSize: "0.85rem", padding: "6px 10px" }}
              />
            </Form.Group>
          ))}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-100 py-2 mt-2 fw-semibold shadow-sm"
            style={{ fontSize: "0.9rem" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Card>
    </>
  );
}

export default QuickTitleCheck;

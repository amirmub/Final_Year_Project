import { Form, Button, Card } from "react-bootstrap";

const QuickTitleCheck = () => (
  <Card className="border-0 shadow-lg mt-2 p-4 rounded-4">
    <div className="d-flex align-items-center mb-3">
      <h5 className="fw-bold text-primary m-0 flex-grow-1">📘Submit Your Title</h5>
    </div>
    <Form className="mt-1">
      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Group Leader Name</Form.Label>
        <Form.Control
          placeholder="Enter full name"
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Select Department</Form.Label>
        <Form.Select className="custom-select">
          <option>Select Department</option>
          <option>Computer Science</option>
          <option>Information Science</option>
          <option>Information Technology</option>
          <option>Software Engineering</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Project Title 1 (Max 15 words)</Form.Label>
        <Form.Control
          placeholder="e.g., Development of Machine Learning Model for Disease Detection"
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Project Title 2 (Max 15 words)</Form.Label>
        <Form.Control
          placeholder="e.g., Design of an IoT-based Smart Irrigation System"
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Project Title 3 (Max 15 words)</Form.Label>
        <Form.Control
          placeholder="e.g., Web App for Student Project Management"
          className="custom-input"
        />
      </Form.Group>

      <Button variant="primary" className="w-100 py-2 mt-2 fw-semibold shadow-sm">
        Submit
      </Button>
    </Form>
  </Card>
);

export default QuickTitleCheck;

import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { FaQuestionCircle, FaInfoCircle, FaUserGraduate, FaBook } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";

const FAQPage = () => {
  return (
   <div style={{backgroundColor: "#F7F7F7",paddingBottom: "30px"}}>
   <Header />
     <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="px-5">
             <Container className="my-4">
      {/* Header Section */}
      <Card className="border-0 shadow-sm  p-4 mb-4 rounded-4">
        <h4 className="fw-bold text-primary mb-2">
          <FaInfoCircle className="me-2" />
          About Title Similarity Detection System
        </h4>
        <p className="text-muted">
          The <strong>Title Similarity Detection System</strong> helps students avoid
          submitting duplicate or closely similar project titles by checking existing
          records. It promotes creativity, transparency, and efficient project supervision
          across all departments.
        </p>
      </Card>

      {/* FAQ Section */}
      <Accordion eventKey="0" alwaysOpen className="shadow-sm rounded-4 border-0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaBook className="text-primary me-2" />
            What is the purpose of this system?
          </Accordion.Header>
          <Accordion.Body>
            This system allows students to submit and check their project titles to ensure
            originality. It compares submitted titles with existing ones to detect
            similarity levels and prevent repetition.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaUserGraduate className="text-primary me-2" />
            Who can use the system?
          </Accordion.Header>
          <Accordion.Body>
            The platform is mainly designed for university students, supervisors, and
            administrators in the Computing and Informatics department. Each user can
            access features relevant to their role.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaQuestionCircle className="text-primary me-2" />
            How does title similarity detection work?
          </Accordion.Header>
          <Accordion.Body>
            The system uses text analysis techniques to calculate how closely a new title
            matches existing titles. It then shows a similarity percentage, helping users
            decide whether to revise or proceed with their submission.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaInfoCircle className="text-primary me-2" />
            How are submissions reviewed and approved?
          </Accordion.Header>
          <Accordion.Body>
            Once a title is submitted, it goes through a review process by department
            supervisors. Approved titles are stored in the database, and pending or
            rejected titles can be revised by the student.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
        <Accordion.Header>
            <FaBook className="text-primary me-2" />
            How do I know if my project title is approved?
        </Accordion.Header>
        <Accordion.Body>
            Once your title is reviewed, the system will update its status automatically.
            You can check your approval status anytime from the <strong>My Submissions</strong> section
            of your dashboard.
        </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Container>
          </Col>
        </Row>
    </Container>
    </div>
  );
};

export default FAQPage;

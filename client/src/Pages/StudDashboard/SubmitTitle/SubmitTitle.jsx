import { Col, Container, Row } from "react-bootstrap";
import QuickTitleCheck from "../../../Components/QuickTitleCheck/QuickTitleCheck";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";

function SubmitTitle() {
  return (
    <>
    <Header />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="px-5">
            <QuickTitleCheck />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SubmitTitle;

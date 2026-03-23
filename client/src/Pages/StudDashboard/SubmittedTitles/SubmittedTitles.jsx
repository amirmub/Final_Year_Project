import Header from '../../../Components/Header/Header'
import MySubmissions from '../../../Components/MySubmissions/MySubmissions'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import { Col, Container, Row } from 'react-bootstrap'

function SubmittedTitles() {
  return (
    <div style={{backgroundColor: "#F7F7F7", height: "100vh"}}>
    <Header />
     <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="px-5">
            <MySubmissions />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SubmittedTitles

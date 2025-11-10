import Header from '../../../Components/Header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import AnnouncementCard from '../../../Components/AnnouncementCard/AnnouncementCard'

function Announcement() {
  return (
    <>
      <Header />
     <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="px-5">
            <AnnouncementCard />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Announcement

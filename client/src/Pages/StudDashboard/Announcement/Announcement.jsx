import Header from '../../../Components/Header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import AnnouncementCard from '../../../Components/AnnouncementCard/AnnouncementCard'
import AnnouncementsPreview from '../../../Components/AnnouncementsPreview/AnnouncementsPreview'

function Announcement() {
  return (
    <div style={{backgroundColor: "#F7F7F7"}}>
      <Header />
     <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="px-5">
            <AnnouncementsPreview />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Announcement

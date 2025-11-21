import { Route, Routes } from 'react-router-dom'
import SubmittedTitle from '../../Pages/AdminDashboard/SubmittedTitle/SubmittedTitle'
import Dashboard from '../../Pages/AdminDashboard/Dashboard/Dashboard'
import CreateAnnouncement from '../../Pages/AdminDashboard/CreateAnnouncement/CreateAnnouncement'

function AdminRoute() {
  return (
    <>
    <Routes>
     <Route path='all-submissions' element={<SubmittedTitle />}/>
     <Route path='dashboard' element={<Dashboard />}/>
     <Route path='create-announcement' element={<CreateAnnouncement />}/>
     {/* <Route path='/admin/faq' element={<FAQPage />}/> */}
    </Routes>
    </>
  )
}

export default AdminRoute

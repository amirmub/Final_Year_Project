import { Route, Routes } from 'react-router-dom'
import SubmittedTitle from '../../Pages/AdminDashboard/SubmittedTitle/SubmittedTitle'
import Dashboard from '../../Pages/AdminDashboard/Dashboard/Dashboard'

function AdminRoute() {
  return (
    <>
    <Routes>
     <Route path='all-submissions' element={<SubmittedTitle />}/>
     <Route path='dashboard' element={<Dashboard />}/>
     {/* <Route path='/admin/announcements' element={<Announcement />}/>
     <Route path='/admin/faq' element={<FAQPage />}/> */}
    </Routes>
    </>
  )
}

export default AdminRoute

import { Route, Routes } from 'react-router-dom'
import SubmittedTitle from '../../Pages/AdminDashboard/SubmittedTitle/SubmittedTitle'
import Dashboard from '../../Pages/AdminDashboard/Dashboard/Dashboard'
import CreateAnnouncement from '../../Pages/AdminDashboard/CreateAnnouncement/CreateAnnouncement'
import Setting from '../../Pages/AdminDashboard/Setting/Setting'

function AdminRoute() {
  return (
    <>
    <Routes>
     <Route path='all-submissions' element={<SubmittedTitle />}/>
     <Route path='dashboard' element={<Dashboard />}/>
     <Route path='create-announcement' element={<CreateAnnouncement />}/>
     <Route path='setting' element={<Setting />}/>
    </Routes>
    </>
  )
}

export default AdminRoute

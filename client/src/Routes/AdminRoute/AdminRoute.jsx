import { Route, Routes } from 'react-router-dom'
import SubmittedTitle from '../../Pages/AdminDashboard/SubmittedTitle/SubmittedTitle'
import Dashboard from '../../Pages/AdminDashboard/Dashboard/Dashboard'
import CreateAnnouncement from '../../Pages/AdminDashboard/CreateAnnouncement/CreateAnnouncement'
import Setting from '../../Pages/AdminDashboard/Setting/Setting'
import NotFound from '../../Pages/NotFound/NotFound'

function AdminRoute() {
  return (
    <>
    <Routes>
     <Route path='all-submissions' element={<SubmittedTitle />}/>
     <Route path='dashboard' element={<Dashboard />}/>
     <Route path='create-announcement' element={<CreateAnnouncement />}/>
     <Route path='setting' element={<Setting />}/>

     <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AdminRoute

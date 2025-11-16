import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import AdminDashboard from './Pages/AdminDashboard/Dashboard/Dashboard'
import NotFound from './Pages/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import StudentRoutes from './Routes/StudentRoutes/StudentRoutes'
import Unauthorized from './Pages/Unauthorized/Unauthorized'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/student/*" element={
            <ProtectedRoute>
              <StudentRoutes />
            </ProtectedRoute>
           }
        />

        {/* admin routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />}/>
        {/* <Route path='/admin/submit-title' element={<SubmitTitle />}/>
        <Route path='/admin/my-submissions' element={<SubmittedTitles />}/>
        <Route path='/admin/announcements' element={<Announcement />}/>
        <Route path='/admin/faq' element={<FAQPage />}/> */}

      </Routes>
    </>
  )
}

export default App

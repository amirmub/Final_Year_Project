import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import SubmitTitle from './Pages/StudDashboard/SubmitTitle/SubmitTitle'
import SubmittedTitles from './Pages/StudDashboard/SubmittedTitles/SubmittedTitles'
import StudDashboard from './Pages/StudDashboard/Dashboard/Dashboard'
import AdminDashboard from './Pages/AdminDashboard/Dashboard/Dashboard'
import Announcement from './Pages/StudDashboard/Announcement/Announcement'
import FAQPage from './Pages/FAQPage/FAQPage'
import NotFound from './Pages/NotFound/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path="*" element={<NotFound />} />

        {/* student routes */}
        <Route path='/student/dashboard' element={<StudDashboard />}/>
        <Route path='/student/submit-title' element={<SubmitTitle />}/>
        <Route path='/student/my-submissions' element={<SubmittedTitles />}/>
        <Route path='/student/announcements' element={<Announcement />}/>
        <Route path='/student/faq' element={<FAQPage />}/>

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

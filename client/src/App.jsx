import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import SubmitTitle from './Pages/StudDashboard/SubmitTitle/SubmitTitle'
import SubmittedTitles from './Pages/StudDashboard/SubmittedTitles/SubmittedTitles'
import Dashboard from './Pages/StudDashboard/Dashboard/Dashboard'
import Announcement from './Pages/StudDashboard/Announcement/Announcement'
import FAQPage from './Pages/FAQPage/FAQPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/submit-title' element={<SubmitTitle />}/>
        <Route path='/my-submissions' element={<SubmittedTitles />}/>
        <Route path='/announcements' element={<Announcement />}/>
        <Route path='/faq' element={<FAQPage />}/>
      </Routes>
    </>
  )
}

export default App

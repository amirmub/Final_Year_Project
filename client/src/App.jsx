import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import StudDashboard from './Pages/StudDashboard/StudDashboard'
import SubmitTitle from './Pages/StudDashboard/SubmitTitle/SubmitTitle'
import SubmittedTitles from './Pages/StudDashboard/SubmittedTitles/SubmittedTitles'
import Dashboard from './Pages/StudDashboard/Dashboard/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/student-dashboard' element={<StudDashboard />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/submit-title' element={<SubmitTitle />}/>
        <Route path='/my-submissions' element={<SubmittedTitles />}/>
      </Routes>
    </>
  )
}

export default App

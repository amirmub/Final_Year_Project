import './App.css'
import LandingPage from './LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './RegisterPage/RegisterPage'
import LoginPage from './LoginPage/LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </>
  )
}

export default App

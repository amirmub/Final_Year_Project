import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import NotFound from './Pages/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import StudentRoutes from './Routes/StudentRoutes/StudentRoutes'
import Unauthorized from './Pages/Unauthorized/Unauthorized'
import { PrivateRoute } from './Routes/PrivateRoute/PrivateRoute'
import AdminRoute from './Routes/AdminRoute/AdminRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/student/*"  element={
            <ProtectedRoute>
              <PrivateRoute role={"student"}>
                <StudentRoutes />
              </PrivateRoute>
            </ProtectedRoute>
           }
        />

        {/* admin routes */}
        <Route path='/admin/*'  element={
          <ProtectedRoute>
            <PrivateRoute role={"admin"}>
              <AdminRoute />
            </PrivateRoute>
          </ProtectedRoute>
           }
        />
        
      </Routes>
    </>
  )
}

export default App

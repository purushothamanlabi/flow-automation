import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './Landing/LandingPage'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { Routes as AppRoutes } from './util/Routes'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main routes */}
        <Route path={AppRoutes.Landing} element={<LandingPage />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        {/* Add additional routes as needed */}
        <Route path={AppRoutes.Register} element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        



        {/* Catch-all route - redirect to home if no match */}
        <Route path="*" element={<Navigate to={AppRoutes.Landing} replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

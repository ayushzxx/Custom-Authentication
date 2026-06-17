import React, { useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ForgotPass from './pages/ForgotPass'
import VerifyEmail from './pages/VerifyEmail'
import Navbar from './components/Navbar'
import ResetPassword from './pages/ResetPassword'

function App() {
  const [user, setUser] = useState(false)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // page where navbar should be visible
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/dashboard"

  return (
    <>
      <div >
        {
          showNavbar && (
            <Navbar
              user={user}
              setUser={setUser}
            />
          )
        }

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPass />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
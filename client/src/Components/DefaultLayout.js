import React from 'react'
import { useAuth } from '../auth/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import LandingPage from '../Layout/Hero'
import NavTop from '../Layout/Navbar'
import Footer from '../Layout/Footer'

const DefaultLayout = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <NavTop/>
     <LandingPage/>
     <Footer/>
    </div>
  )
}

export default DefaultLayout

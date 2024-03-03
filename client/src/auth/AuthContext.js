// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userID, setUserID] = useState(null)
  const [email, setEmail] = useState(null)
  const [isPaid, setIsPaid] = useState(false)
  const [referredBy, setReferredBy] = useState(null)

  useEffect(() => {
    // Load authentication data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('authData'))
    if (storedData) {
      setUserID(storedData.userID)
      setEmail(storedData.email)
      setIsPaid(storedData.isPaid)
      setReferredBy(storedData.referredBy)
      setIsLoggedIn(storedData.isLoggedIn)
    }
  }, [])

  const login = (userData) => {
    if (userData && userData._id && userData.email) {
      setUserID(userData._id)
      setEmail(userData.email)
      setIsPaid(userData.isPaid || false)
      setReferredBy(userData.referrerCode || null)
      setIsLoggedIn(true)

      // Save authentication data to local storage
      localStorage.setItem(
        'authData',
        JSON.stringify({
          userID: userData._id,
          email: userData.email,
          isPaid: userData.isPaid || false,
          referredBy: userData.referrerCode || null,
          isLoggedIn: true,
        }),
      )
    } else {
      console.error('Invalid user data during login')
    }
  }

  const logout = () => {
    setUserID(null)
    setEmail(null)
    setIsPaid(false)
    setReferredBy(null)
    setIsLoggedIn(false)

    // Remove authentication data from local storage on logout
    localStorage.removeItem('authData')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userID, email, isPaid, referredBy, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)

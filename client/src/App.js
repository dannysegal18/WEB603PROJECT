import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register';
import Login from './Components/Login';
import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import DefaultLayout from './Components/DefaultLayout';
import ProfileUpdateForm from './Components/Profile';
import AppointmentList from './Components/Appointment';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/profile" name="Profile Page" element={<ProfileUpdateForm />} />
              <Route exact path="/appointments" name="Appointment Page" element={<AppointmentList />} />

              {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
              <Route path="/" name="Home" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    )
  }
}

  export default App

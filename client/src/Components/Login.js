import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../auth/AuthContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { login } = useAuth()


  const handleLogin = async () => {
    try {
      // Check if email and password are not empty
      if (!email.trim() || !password.trim()) {
        toast.error("Please enter both email and password.");
        return;
      }
      console.log(email)
      console.log(password)
  
      setLoading(true);
      try {
        setLoading(true) // Set loading state to true
        const response = await fetch('/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
  
        const data = await response.json()
  
        if (data.status === 'SUCCESS') {
          // Successful login, show success toast
          toast.success('Login successful!', {  position: 'top-center', })
          console.log('Login successful')
          // Store email and userID using the login function from useAuth
          login(data.data[0])
          console.log(login)
  
          // Navigate to the home page
          navigate('/')
        } else {
          // Handle login failure (e.g., display error message)
          toast.error(`Login failed: ${data.message}`, {   position: 'top-center', })
          console.error('Login failed:', data.message)
        }
      } catch (error) {
        // Handle network or other errors
        toast.error('Error during login. Please try again.', {   position: 'top-center', })
        console.error('Error during login:', error)
      } finally {
        setLoading(false) // Set loading state back to false, whether success or failure
      }
  
      
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error("Failed to login. Please try again.");
    }
  };
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <form>
                  <h1 className="text-center mb-4">Login</h1>
                  <p className="text-medium-emphasis text-center">
                    Sign in to your account
                  </p>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <button
                      type="button"
                      className="btn btn-interact w-100 text-white"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none">
                      <span className="text-yellow">Register</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

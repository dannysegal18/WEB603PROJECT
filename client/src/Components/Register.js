import React, { useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link ,useNavigate} from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
        setLoading(true)
  
        // Make sure password and confirmPassword match
        if (password !== confirmPassword) {
          toast.error('Password and Confirm Password do not match', {
            position: 'top-center',
          })
          setLoading(false)
          return
        }
  
        let requestBody = {
          username,
          email,
          password,
          confirmPassword,
        }
  
        const response = await fetch('/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
  
        const data = await response.json()
  
        if (data.status === 'PENDING') {
          toast.success('Registration successful. Email Verification Link sent!', {
            position: 'top-center',
          })
          console.log('Registration successful')
          navigate('/login')
        } else if (data.status === 'FAILED') {
          toast.error(`Registration failed: ${data.message}`, {
            position: 'top-center',
          })
          console.error('Registration failed:', data.message)
        }
      } catch (error) {
        toast.error('Error during Registration. Please try again.', {
            position: 'top-center',
        })
        console.error('Error during Registration:', error)
      } finally {
        setLoading(false)
      }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7 col-xl-6">
            <div className="card mx-4  shadow">
              <div className="card-body p-4">
                <form onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      id="usernameInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="emailInput"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="passwordInput"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="confirmPasswordInput"
                      className="form-label"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="confirmPasswordInput"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <button
                      id="registerButton"
                      className="btn btn-interact text-white"
                      onClick={handleRegister}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        'Sign Up'
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-2">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                      <span className="text-yellow">Login</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <ToastContainer />
      </div>
     
    </div>
  );
};

export default Register;

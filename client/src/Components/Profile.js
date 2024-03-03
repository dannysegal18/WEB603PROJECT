import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthContext";
import { Link ,useNavigate} from "react-router-dom";



function ProfileUpdateForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [editMode, setEditMode] = useState(false);
  const { userID  } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/user/profile/${userID}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData(userData.data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., display an error message
      }
    };
    fetchUserData();
  }, [userID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/user/profile/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Profile updated successfully');
        setEditMode(false); // Exit edit mode after successful update
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleBackClick = () => {
    // Redirect to main menu page
    navigate('/')
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
 <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Update Profile</h2>
              <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back to Main Menu</button>

              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn mt-3 btn-interact text-white">Update</button>
                </form>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      readOnly // Disable editing when not in edit mode
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value="******" // Display placeholder for password
                      readOnly // Disable editing when not in edit mode
                    />
                  </div>
                  
                  <button type="button" className="btn mt-3 btn-interact text-white" onClick={handleEditClick}>Edit</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default ProfileUpdateForm;

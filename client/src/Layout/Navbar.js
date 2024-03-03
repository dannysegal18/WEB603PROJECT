import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaUser, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from '../assets/logo192.png'
import { Col, Row } from "react-bootstrap";
const NavTop = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { userID } = useAuth();
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/user/profile/${userID}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData(userData.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., display an error message
      }
    };
    fetchUserData();
  }, [userID]);

  const handleHistoryClick = () => {
    // Redirect to main menu page
    navigate('/appointments')
  };
  const handleUserClick = () => {
    // Redirect to main menu page
    navigate('/profile')
  };

  return (
    <Navbar fixed="top" className="bg-green navbar-nav navbar text-white">
      <Container>
        <Navbar.Brand  href="#home"> <img src={Logo} alt="Logo" className="w-10 navbar-brand"></img></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <FaHistory onClick={handleHistoryClick} className="mx-2 hover-effect cursor-pointer" style={{ color: "white" }} />{" "}
          {/* Add User icon with margin-right */}
          <FaUser onClick={handleUserClick} className="mx-2 cursor-pointer hover-effect " style={{ color: "white" }} />{" "}
          {/* Add User icon with margin-right */}
          <Navbar.Text>
            {" "}
            <Link className="text-yellow hover-effect text-white" to="/profile">
              {formData.username}
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavTop;

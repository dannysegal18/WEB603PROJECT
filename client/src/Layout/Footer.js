import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <Navbar fixed='bottom' className="bg-green ">
      <Container>
        <Navbar.Text>
          &copy; 2024 Your Company Name. All rights reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;

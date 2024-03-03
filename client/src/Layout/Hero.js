import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Button,
} from "reactstrap";
import { useAuth } from "../auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LandingPage = () => {
  const [modal, setModal] = useState(false);
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false);
  const { setEmail,email, userID,  } = useAuth()
  const [appointmentDate, setAppointmentDate] = useState(new Date());


  

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleAppointment = async () => {
    console.log("userID" +userID)
    console.log("email" + email)
    console.log("Appointment Date" + appointmentDate)
    setLoading(true);
    try {
      const response = await fetch('user/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, email, appointmentDate }),
      });
      const data = await response.json();
      console.log('Appointment created:', data);
      toast.success('Appointment booked successfully!', {  position: 'top-center', })
      setModal(false);
      // Reset form fields or do something else on success
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col md={8}>
            <h1 className="display-4">
              Welcome to our school Therapy Ticket Booking System
            </h1>
            <p className="lead">Book an appointment now!</p>
            <Col>
              <Button color="warning" onClick={logout} outline="true" size="lg" className="mx-2 hover-effect">
                Logout
              </Button>
              <Button
                onClick={toggleModal}
                className="hover-effect"
                 color="success"
                size="lg"
              >
                Book Now
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book an appointment</ModalHeader>
        <ModalBody>
          <Label htmlFor="reason">Reason for Appointment</Label>
          <Input
            type="text"
            id="reason"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label className="mt-2" htmlFor="datepicker">
            Appointment Date
          </Label>
          <DatePicker
            id="datepicker"
            selected={appointmentDate}
            className="mx-2"
            onChange={(date) => setAppointmentDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={handleAppointment}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Book"
            )}
          </Button>
          <Button  outline="true"  color="danger" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;

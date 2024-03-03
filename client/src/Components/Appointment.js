import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const { userID } = useAuth();
  const [modal, setModal] = useState(false);
  const { logout,email } = useAuth();
  const [loading, setLoading] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [newAppointmentDate, setNewAppointmentDate] = useState(new Date());
  const [appointmentID, setAppointmentID] = useState(null);

  const toggleModal = (appointmentID) => {
    setModal(!modal);
    setAppointmentID(appointmentID); // Set the appointment ID in the state
  };

  useEffect(() => {
    // Fetch appointments from backend upon component mount
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`user/appointments/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateAppointment = async (appointmentID, newDate) => {
    try {
        setLoading(true)
      const response = await fetch(`user/appointments/${appointmentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentDate: newDate }),
      });
      if (response.ok) {
        setLoading(false)
        toast.success('Appointment Rescheduled!', {  position: 'top-center', })
        // Update local state or fetch appointments again to reflect changes
        toggleModal(); // Close the modal after successful update
      } else {
        throw new Error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeleteAppointment = async (appointmentID) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this appointment?"
      );

      if (confirmDelete) {
        const response = await fetch(`user/appointments/${appointmentID}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted appointment from the UI
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment._id !== appointmentID
            )
          );
        } else {
          throw new Error("Failed to delete appointment");
        }
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <div>
        <h1 className="text-center mb-4">Appointments</h1>
        </div>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div>
              {appointments.map((appointment) => (
                <div key={appointment._id} className="my-3 border p-3">
                  <p>
                    <strong>Email:</strong> {appointment.email}
                  </p>
                  <p>
                    <strong>Appointment Date:</strong>{" "}
                    {appointment.appointmentDate}
                  </p>
                  <Button
                    color="success"
                    onClick={() => toggleModal(appointment._id)}
                    className="mx-2"
                  >
                    Reschedule
                  </Button>
                  <Button
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book an appointment</ModalHeader>
        <ModalBody>
          {/* <Label htmlFor="email">Enter Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <Label className="mt-2" htmlFor="datepicker">
            Appointment Date
          </Label>
          <DatePicker
            id="datepicker"
            selected={newAppointmentDate}
            onChange={(date) => setNewAppointmentDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() =>
              handleUpdateAppointment(appointmentID, newAppointmentDate)
            }
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

          <Button outline="true" color="danger" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default AppointmentList;

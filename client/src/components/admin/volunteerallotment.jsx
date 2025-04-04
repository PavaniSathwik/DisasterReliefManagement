import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Table, Badge, Form } from "react-bootstrap";
import { FaUserCheck } from "react-icons/fa";

const AdminVolunteerApproval = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "John Doe",
      photo: "/volunteer1.jpg",
      location: "Brooklyn, NY",
      message: "I want to assist with medical aid and resources.",
      qualification: "Certified EMT, 3 Years Experience",
      capabilities: "CPR, Trauma Handling, Crowd Control",
      status: "Pending",
      adminResponse: "",
    },
    {
      id: 2,
      name: "Sarah Lee",
      photo: "/volunteer1.jpg",
      location: "Los Angeles, CA",
      message: "I want to help with evacuation planning and first aid kits.",
      qualification: "Volunteer Firefighter, 2 Years Experience",
      capabilities: "Fire Safety, Evacuation Planning, Swift Response",
      status: "Pending",
      adminResponse: "",
    },
  ]);

  const [responseMessage, setResponseMessage] = useState({});

  const handleAllot = (volunteerId) => {
    setVolunteers(
      volunteers.map((volunteer) =>
        volunteer.id === volunteerId
          ? {
              ...volunteer,
              status: "Allotted ✅",
              adminResponse: responseMessage[volunteerId] || "Allotted ✅",
            }
          : volunteer
      )
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">🙌 Volunteer Approval Panel</h2>
      <div className="row">
        {volunteers.length === 0 ? (
          <p className="text-muted text-center">No Volunteer Requests</p>
        ) : (
          volunteers.map((volunteer) => (
            <div key={volunteer.id} className="col-md-6 mb-4">
              <Card className="shadow-lg p-4 rounded border-0">
                <div className="text-center">
                  <img
                    src={volunteer.photo}
                    alt="Volunteer"
                    className="rounded-circle border border-primary"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <h4 className="mt-2 text-dark fw-bold">{volunteer.name}</h4>
                  <p className="text-muted mb-2"><strong>📍 Location:</strong> {volunteer.location}</p>
                  <Badge bg={volunteer.status === "Pending" ? "warning" : "success"} className="mb-3">
                    {volunteer.status}
                  </Badge>
                </div>

                <Table bordered hover size="sm" className="mb-3">
                  <tbody>
                    <tr>
                      <td><strong>📩 Request:</strong></td>
                      <td>{volunteer.message}</td>
                    </tr>
                    <tr>
                      <td><strong>🎓 Qualification:</strong></td>
                      <td>{volunteer.qualification}</td>
                    </tr>
                    <tr>
                      <td><strong>💪 Capabilities:</strong></td>
                      <td>{volunteer.capabilities}</td>
                    </tr>
                  </tbody>
                </Table>

                <div className="text-center">
                  {volunteer.status === "Pending" ? (
                    <>
                      <Form.Select
                        className="mb-2"
                        onChange={(e) =>
                          setResponseMessage({ ...responseMessage, [volunteer.id]: e.target.value })
                        }
                      >
                        <option value="">Select Response...</option>
                        <option value="Thanks for your initiation">✅ Thanks for your initiation</option>
                        <option value="No need, our team takes the action, thanks">❌ No need, our team takes the action, thanks</option>
                        <option value="Your allotment is successful, thanks for your coordination">🎉 Your allotment is successful, thanks for your coordination</option>
                      </Form.Select>
                      <Button variant="success" onClick={() => handleAllot(volunteer.id)}>
                        <FaUserCheck /> SEND
                      </Button>
                    </>
                  ) : (
                    <p className="text-success fw-bold">✅ {volunteer.adminResponse}</p>
                  )}
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminVolunteerApproval;
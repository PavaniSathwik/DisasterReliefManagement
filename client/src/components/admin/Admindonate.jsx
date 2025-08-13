import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form, Modal, Table, Badge } from "react-bootstrap";
import { FaCheckCircle, FaBell } from "react-icons/fa";

const AdminDonate = () => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      photo: "/volunteer1.jpg",
      location: "Brooklyn, NY",
      donationType: "Clothes",
      incident: "Hurricane Relief Efforts",
      message: "I saw the urgency for the hurricane victims and want to help.",
      amount: "$100",
      items: ["Winter Jackets", "Gloves", "Scarves"],
      status: "Pending",
      packagedPhoto: "/volunteer1.jpg",
      repPhoto: "/volunteer1.jpg",
      donorWithRepPhoto: "/volunteer1.jpg",
    },
    {
      id: 2,
      name: "Mark Smith",
      photo: "/volunteer1.jpg",
      location: "Los Angeles, CA",
      donationType: "Food & Groceries",
      incident: "Wildfire Victims Support",
      message: "I want to donate essential food items to help the displaced families.",
      amount: "$200",
      items: ["Rice", "Canned Beans", "Bottled Water"],
      status: "Pending",
      packagedPhoto: "/volunteer1.jpg",
      repPhoto: "/volunteer1.jpg",
      donorWithRepPhoto: "/volunteer1.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");

  const handleApprove = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const sendAppreciation = () => {
    if (selectedDonor) {
      setDonors(
        donors.map((donor) =>
          donor.id === selectedDonor.id
            ? { ...donor, status: "Approved ✅", appreciationMessage: adminMessage }
            : donor
        )
      );
    }
    setShowModal(false);
    setAdminMessage("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">🙏 Donation Approval Panel</h2>
      <div className="row">
        {donors.length === 0 ? (
          <p className="text-muted text-center">No Donations Yet</p>
        ) : (
          donors.map((donor) => (
            <div key={donor.id} className="col-md-6 mb-4">
              <Card className="shadow-lg p-4 rounded border-0" style={{ background: "#ffffff" }}>
                <div className="text-center">
                  <img
                    src={donor.photo}
                    alt="Donor"
                    className="rounded-circle border border-primary mb-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <h4 className="text-dark fw-bold">{donor.name}</h4>
                  <p className="text-muted"><strong>📍 Location:</strong> {donor.location}</p>
                  <Badge bg={donor.status === "Pending" ? "warning" : "success"} className="mb-3">
                    {donor.status}
                  </Badge>
                </div>
                <Table bordered hover size="sm" className="mb-3">
                  <tbody>
                    <tr>
                      <td><strong>🎁 Donation Type:</strong></td>
                      <td>{donor.donationType}</td>
                    </tr>
                    <tr>
                      <td><strong>⚠️ Incident:</strong></td>
                      <td>{donor.incident}</td>
                    </tr>
                    <tr>
                      <td><strong>💬 Purpose:</strong></td>
                      <td>{donor.message}</td>
                    </tr>
                    <tr>
                      <td><strong>💲 Donation Amount:</strong></td>
                      <td>{donor.amount}</td>
                    </tr>
                    <tr>
                      <td><strong>📦 Items Donated:</strong></td>
                      <td>{donor.items.join(", ")}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="row text-center mb-3">
                  <div className="col-12 col-md-4 mb-2">
                    <img src={donor.packagedPhoto} alt="Package" className="img-fluid rounded" style={{ maxHeight: "120px" }} />
                    <p className="text-muted mt-1">📦 Package Ready</p>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <img src={donor.repPhoto} alt="Recipient" className="img-fluid rounded" style={{ maxHeight: "120px" }} />
                    <p className="text-muted mt-1">👤 Recipient</p>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <img src={donor.donorWithRepPhoto} alt="Donor" className="img-fluid rounded" style={{ maxHeight: "120px" }} />
                    <p className="text-muted mt-1">🙋 Donor</p>
                  </div>
                </div>
                {donor.status === "Pending" && (
                  <div className="text-center">
                    <Button variant="warning" className="me-2" onClick={() => alert("Alert sent to locality.")}> 
                      <FaBell /> Alert Locality
                    </Button>
                    <Button variant="success" onClick={() => handleApprove(donor)}>
                      <FaCheckCircle /> Approve & Appreciate
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          ))
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appreciation Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter your heartfelt message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={sendAppreciation}>Send Appreciation</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDonate;

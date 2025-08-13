import React, { useState } from "react";
import { Card, Button, Badge, Row, Col, Form } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const VolunteerCard = ({ volunteer, onApprove, onReject }) => {
  const [comment, setComment] = useState("");

  return (
    <Card
  className="shadow-sm rounded-3 p-3 mb-4 border border-secondary-subtle mx-auto"
  style={{
    backgroundColor: "#fdfdfd",
    maxWidth: "800px",
    fontSize: "0.9rem",
    borderLeft: "6px solid #0d6efd", // official tone
  }}
>
  <Row>
    {/* PHOTO SECTION */}
    <Col
      md={3}
      className="text-center d-flex flex-column align-items-center justify-content-center border-end border-light"
    >
      {volunteer.photo ? (
        <img
          src={`http://localhost:3002/uploads/${volunteer.photo}`}
          alt="Volunteer"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "2px solid #ddd",
          }}
        />
      ) : (
        <div
          className="bg-secondary mb-2"
          style={{ width: "90px", height: "90px", borderRadius: "8px" }}
        ></div>
      )}
      <h6 className="fw-semibold mt-2 mb-0">{volunteer.name}</h6>
      <span className="text-muted small">{volunteer.gender}, {volunteer.age} yrs</span>
      <Badge bg="primary" className="mt-2">{volunteer.locality}</Badge>
    </Col>

    {/* INFO SECTION */}
    <Col md={9}>
      <Row className="mb-2">
        <Col md={6}>
          <div><strong>📞 Contact:</strong> {volunteer.contact}</div>
          <div><strong>📧 Email:</strong> {volunteer.email}</div>
          <div><strong>🆔 ID:</strong> {volunteer.idType} – {volunteer.idNumber}</div>
          <div><strong>📆 Availability:</strong> {volunteer.availability}</div>
        </Col>
        <Col md={6}>
          <div><strong>💡 Skills:</strong> {volunteer.skills}</div>
          <div><strong>🎯 Preferred Role:</strong> {volunteer.role}</div>
          <div><strong>🗺️ Location:</strong> {volunteer.observedLocation}</div>
          <div><strong>👀 Observed:</strong> {volunteer.observation}</div>
        </Col>
      </Row>

      <hr className="my-2" />

      <Row className="mb-2">
        <Col md={6}><strong>📝 Motivation:</strong> {volunteer.motivation}</Col>
        <Col md={6}><strong>💪 Contribution:</strong> {volunteer.contribution}</Col>
      </Row>

      {/* COMMENT + BUTTONS */}
      <Row className="align-items-center mt-3">
        <Col md={8}>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Admin comments (e.g., Approve reason)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              fontSize: "0.85rem",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ced4da",
            }}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-end gap-2 mt-2 mt-md-0">
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => onApprove(volunteer.id, comment)}
          >
            <FaCheckCircle className="me-1" /> Approve
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => onReject(volunteer.id, comment)}
          >
            <FaTimesCircle className="me-1" /> Reject
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
</Card>

  );
};

export default VolunteerCard;

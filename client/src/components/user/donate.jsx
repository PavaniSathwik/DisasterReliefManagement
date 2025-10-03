import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const colors = {
  primary: "#003366",
  lightBg: "#f9fafc",
};

const DonateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    donationType: "",
    incident: "",
    message: "",
    amount: "",
    items: "",
  });

  const [packagedPhoto, setPackagedPhoto] = useState(null);
  const [repPhoto, setRepPhoto] = useState(null);
  const [donorWithRepPhoto, setDonorWithRepPhoto] = useState(null);

  const [packagedPreview, setPackagedPreview] = useState(null);
  const [repPreview, setRepPreview] = useState(null);
  const [donorWithRepPreview, setDonorWithRepPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit a donation");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (key === "items") {
        val
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
          .forEach((item) => data.append("items[]", item));
      } else {
        data.append(key, val);
      }
    });

    if (packagedPhoto) data.append("packagedPhoto", packagedPhoto);
    if (repPhoto) data.append("repPhoto", repPhoto);
    if (donorWithRepPhoto) data.append("donorWithRepPhoto", donorWithRepPhoto);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3002/api/users/donation",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Donation submitted successfully!");
      console.log(res.data);
      setFormData({
        name: "",
        location: "",
        donationType: "",
        incident: "",
        message: "",
        amount: "",
        items: "",
      });
      setPackagedPhoto(null);
      setRepPhoto(null);
      setDonorWithRepPhoto(null);
      setPackagedPreview(null);
      setRepPreview(null);
      setDonorWithRepPreview(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to submit donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="mx-auto my-5 p-4 shadow-lg"
      style={{ maxWidth: 600, backgroundColor: colors.lightBg, borderRadius: 16 }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: colors.primary, fontWeight: "bold" }}
      >
        🙏 Make a Donation
      </h2>
      <Form onSubmit={handleSubmit}>
        {/* Donor Name */}
        <Form.Group className="mb-3">
          <Form.Label>👤 Donor Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </Form.Group>

        {/* Location */}
        <Form.Group className="mb-3">
          <Form.Label>📍 Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, state"
          />
        </Form.Group>

        {/* Donation Type */}
        <Form.Group className="mb-3">
          <Form.Label>🎁 Donation Type *</Form.Label>
          <Form.Control
            type="text"
            name="donationType"
            value={formData.donationType}
            onChange={handleChange}
            placeholder="E.g., Clothes, Food"
            required
          />
        </Form.Group>

        {/* Incident */}
        <Form.Group className="mb-3">
          <Form.Label>⚠️ Incident *</Form.Label>
          <Form.Control
            type="text"
            name="incident"
            value={formData.incident}
            onChange={handleChange}
            placeholder="Incident related to donation"
            required
          />
        </Form.Group>

        {/* Message */}
        <Form.Group className="mb-3">
          <Form.Label>💬 Purpose / Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Why are you donating?"
          />
        </Form.Group>

        {/* Amount */}
        <Form.Group className="mb-3">
          <Form.Label>💲 Donation Amount</Form.Label>
          <Form.Control
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="E.g., $100 or N/A"
          />
        </Form.Group>

        {/* Items */}
        <Form.Group className="mb-3">
          <Form.Label>📦 Items Donated</Form.Label>
          <Form.Control
            type="text"
            name="items"
            value={formData.items}
            onChange={handleChange}
            placeholder="Comma separated list, e.g., Jackets, Gloves"
          />
        </Form.Group>

        {/* Packaged Photo */}
        <Form.Group className="mb-3">
          <Form.Label>📦 Packaged Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setPackagedPhoto, setPackagedPreview)}
          />
          {packagedPreview && (
            <img
              src={packagedPreview}
              alt="Packaged Donation"
              style={{ marginTop: 10, maxHeight: 150, borderRadius: 12 }}
            />
          )}
        </Form.Group>

        {/* Recipient Photo */}
        <Form.Group className="mb-3">
          <Form.Label>👤 Recipient Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setRepPhoto, setRepPreview)}
          />
          {repPreview && (
            <img
              src={repPreview}
              alt="Recipient"
              style={{ marginTop: 10, maxHeight: 150, borderRadius: 12 }}
            />
          )}
        </Form.Group>

        {/* Donor & Recipient Photo */}
        <Form.Group className="mb-3">
          <Form.Label>🙋 Donor & Recipient Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(e, setDonorWithRepPhoto, setDonorWithRepPreview)
            }
          />
          {donorWithRepPreview && (
            <img
              src={donorWithRepPreview}
              alt="Donor & Recipient"
              style={{ marginTop: 10, maxHeight: 150, borderRadius: 12 }}
            />
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-4 py-3"
          style={{ fontWeight: "700" }}
        >
          {loading ? "Submitting..." : "🚀 Submit Donation"}
        </Button>
      </Form>
    </Card>
  );
};

export default DonateForm;

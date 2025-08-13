import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    locality: "",
    idType: "",
    idNumber: "",
    skills: "",
    role: "",
    availability: "",
    motivation: "",
    observedLocation: "",
    observation: "",
    contribution: "",
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "skills") {
        // send skills as array of strings
        val.split(",").map((s) => s.trim()).filter(Boolean).forEach(skill => data.append("skills[]", skill));
      } else {
        data.append(key, val);
      }
    });
    if (photo) {
      data.append("profilePicture", photo); // ✅ matches backend

    }

    try {
      const res = await axios.post("http://localhost:3002/api/users/volunteer", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      // Clear form
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        locality: "",
        idType: "",
        idNumber: "",
        skills: "",
        role: "",
        availability: "",
        motivation: "",
        observedLocation: "",
        observation: "",
        contribution: "",
      });
      setPhoto(null);
    } catch (err) {
      alert("Error submitting volunteer request: " + (err.response?.data?.message || err.message));
    }
  };

  return (
  <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, background: "#f8f9fa", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: 10 }}>
    <h2 style={{ textAlign: "center", color: "#007bff", marginBottom: 20 }}>Volunteer Request Form</h2>

    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label style={uploadLabelStyle}>
        <FaCloudUploadAlt size={40} style={{ color: "#007bff" }} />
        <p style={{ marginTop: 10 }}>Upload Profile Picture</p>
        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
      </label>

      {photo && (
        <div style={{ textAlign: "center", marginTop: 15 }}>
          <img
            src={URL.createObjectURL(photo)}
            alt="Profile Preview"
            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "3px solid #007bff" }}
          />
        </div>
      )}

      <input type="text" name="fullName" placeholder="Full Name*" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
      <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} style={inputStyle} />

      <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} style={inputStyle} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} />
      <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} style={inputStyle} />
      <input type="text" name="idType" placeholder="ID Type" value={formData.idType} onChange={handleChange} style={inputStyle} />
      <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} style={inputStyle} />

<select
  name="skills"
  value={formData.skills}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="">Select Skills</option>
  <option value="Medical Aid || Logistics || Search & Rescue">Medical Aid || Logistics || Search & Rescue</option>
  <option value="Cooking || Transport || Communication">Cooking || Transport || Communication</option>
  <option value="First Aid || Crowd Management || Emergency Response">First Aid || Crowd Management || Emergency Response</option>
</select>



      <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
        <option value="">Select Role</option>
        <option value="First Responder">First Responder</option>
        <option value="Supply Coordinator">Supply Coordinator</option>
        <option value="Shelter Manager">Shelter Manager</option>
        <option value="Transport Support">Transport Support</option>
      </select>

      <select name="availability" value={formData.availability} onChange={handleChange} style={inputStyle}>
        <option value="">Select Availability</option>
        <option value="Today Evening">Today Evening</option>
        <option value="Tomorrow Morning">Tomorrow Morning</option>
        <option value="This Weekend">This Weekend</option>
        <option value="Anytime">Anytime</option>
      </select>

      <textarea name="motivation" placeholder="Motivation" value={formData.motivation} onChange={handleChange} style={textareaStyle} />

      <select name="observedLocation" value={formData.observedLocation} onChange={handleChange} style={inputStyle}>
        <option value="">Select Observed Location</option>
        <option value="Tadepalli">Tadepalli</option>
        <option value="Guntur">Guntur</option>
        <option value="Vijayawada">Vijayawada</option>
        <option value="Kunchanapalli">Kunchanapalli</option>
      </select>

      <textarea name="observation" placeholder="Observation" value={formData.observation} onChange={handleChange} style={textareaStyle} />

      <select name="contribution" value={formData.contribution} onChange={handleChange} style={inputStyle}>
        <option value="">Select Contribution</option>
        <option value="Food Donation">Food Donation</option>
        <option value="Clothes">Clothes</option>
        <option value="Transport Support">Transport Support</option>
        <option value="Time/Volunteering">Time/Volunteering</option>
      </select>

      <button type="submit" style={buttonStyle}>Submit Request</button>
    </form>
  </div>
);

};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 5,
  border: "1px solid #ced4da",
  boxSizing: "border-box",
};
const textareaStyle = { ...inputStyle, height: 80, resize: "none" };
const buttonStyle = {
  width: "100%",
  padding: 10,
  marginTop: 20,
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};
const uploadLabelStyle = {
  display: "block",
  textAlign: "center",
  border: "2px dashed #007bff",
  padding: 20,
  cursor: "pointer",
  borderRadius: 10,
};

export default VolunteerForm;

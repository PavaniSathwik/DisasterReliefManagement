import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    request: "",
    qualification: "",
    capabilities: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.post("http://localhost:3002/api/users/volunteer", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error submitting volunteer request: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#f8f9fa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#007bff", marginBottom: "20px" }}>Volunteer Request Form</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label style={{ display: "block", textAlign: "center", border: "2px dashed #007bff", padding: "20px", cursor: "pointer", borderRadius: "10px" }}>
          <FaCloudUploadAlt size={40} style={{ color: "#007bff" }} />
          <p style={{ marginTop: "10px" }}>Upload Profile Picture</p>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
        </label>

        {profilePicture && (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #007bff" }} />
          </div>
        )}

        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        <textarea name="request" placeholder="Your Volunteer Request" value={formData.request} onChange={handleChange} required style={textareaStyle}></textarea>
        <input type="text" name="qualification" placeholder="Your Qualifications" value={formData.qualification} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="capabilities" placeholder="Your Capabilities" value={formData.capabilities} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Submit Request</button>
      </form>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "10px", marginTop: "10px", borderRadius: "5px", border: "1px solid #ced4da" };
const textareaStyle = { ...inputStyle, height: "80px", resize: "none" };
const buttonStyle = { width: "100%", padding: "10px", marginTop: "20px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };

export default VolunteerForm;

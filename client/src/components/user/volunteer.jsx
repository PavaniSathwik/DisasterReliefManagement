import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const colors = {
  red: "#e84335", // Urgent red
  orange: "#e67e22", // Warm orange
  background: "#f8f9fa",
  textDark: "#2c3e50",
  borderRadius: "12px",
  shadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
};

const cardShadowStyle = {
  boxShadow: colors.shadow,
  borderRadius: colors.borderRadius,
  backgroundColor: "#ffffff",
  padding: "24px",
};

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
        val
          .split("||")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((skill) => data.append("skills[]", skill));
      } else {
        data.append(key, val);
      }
    });
    if (photo) {
      data.append("profilePicture", photo);
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/api/users/volunteer",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message);
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
      alert(
        "Error submitting volunteer request: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Helper for two-column layout inputs inside the form
  const renderInput = (
    label,
    name,
    type = "text",
    required = false,
    options
  ) => (
    <div
      className="mb-3"
      style={{
        flex: "1 1 48%",
        minWidth: 200,
      }}
      key={name}
    >
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="form-select form-select-sm"
          required={required}
          style={{ borderColor: colors.orange }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "" ? "-- Select --" : opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={3}
          className="form-control form-control-sm"
          style={{ resize: "vertical", borderColor: colors.orange }}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="form-control form-control-sm"
          required={required}
          style={{ borderColor: colors.orange }}
        />
      )}
    </div>
  );

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: 1100,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        className="d-flex gap-4"
        style={{
          alignItems: "flex-start",
          justifyContent: "start",
          minHeight: 800,
        }}
      >
        {/* Left: Precautions & Info Card */}
        <div
          style={{
            minWidth: 360,
            maxWidth: 360,
            textAlign: "left",
            overflowY: "auto",
            height: "100%",
            boxSizing: "border-box",
            borderRadius: colors.borderRadius,
            backgroundColor: "#fff4e6",
            border: `3px solid ${colors.orange}`,
            padding: "24px",
            boxShadow: colors.shadow,
            color: colors.textDark,
            flexShrink: 0,
          }}
        >
          <h4
            className="fw-bold mb-3"
            style={{ color: colors.red, fontWeight: "900" }}
          >
            🚨 Volunteer with Urgency and Care
          </h4>
          <p>🙋‍♀️ <strong>Your role as a volunteer is essential</strong> to saving lives and restoring hope.</p>
          <p>🔍 <strong>Assess situations carefully</strong> and prioritize safety for yourself and others.</p>
          <p>📸 <strong>Document clearly:</strong> photos/videos help responders only if it's safe.</p>
          <p>📍 <strong>Confirm location:</strong> accurate info helps us send help faster.</p>
          <p>👥 <strong>Count affected people:</strong> precise numbers improve resource allocation.</p>
          <p>⚠️ <strong>Assign severity properly:</strong> helps in prioritizing critical needs.</p>
          <p>🏥 <strong>Declare your skills:</strong> so you can be deployed effectively.</p>
          <p>🛑 <strong>Follow coordinators:</strong> ensure safety and smooth aid.</p>
          <p>📱 <strong>Stay reachable:</strong> update contact info and respond promptly.</p>
          <p>🤝 <strong>Together we build resilience:</strong> your volunteer efforts make strong communities.</p>
          <p style={{ fontSize: "0.9rem", color: colors.red, fontWeight: "700", marginTop: 20 }}>
            ⚠️ <em>Always volunteer safely and responsibly.</em>
          </p>
        </div>

        {/* Right: Volunteer Form */}
        <div
          className="flex-grow-1"
          style={{
            maxWidth: 700,
            minWidth: 650,
            ...cardShadowStyle,
            padding: "24px",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: colors.orange }}>
            Volunteer Request Form
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Photo Upload */}
            <label
              htmlFor="photoUpload"
              className="d-block text-center border rounded-3 p-4 mb-4"
              style={{
                cursor: "pointer",
                borderColor: colors.orange,
                color: colors.orange,
                fontWeight: "700",
              }}
            >
              <FaCloudUploadAlt size={40} />
              <p className="mt-2 mb-0">
                {photo ? "Photo Selected" : "Upload Profile Picture"}
              </p>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </label>

            {photo && (
              <div className="text-center mb-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Profile Preview"
                  className="rounded-circle"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    border: `3px solid ${colors.orange}`,
                  }}
                />
              </div>
            )}

            {/* Form inputs: 2-column layout */}
            <div className="d-flex flex-wrap justify-content-between gap-3">
              {renderInput("Full Name*", "fullName", "text", true)}
              {renderInput("Age", "age", "number")}
              {renderInput("Gender", "gender", "select", false, [
                "",
                "Male",
                "Female",
                "Other",
              ])}
              {renderInput("Contact Number", "contact", "text")}
              {renderInput("Email", "email", "email")}
              {renderInput("Locality", "locality", "text")}
              {renderInput("ID Type", "idType", "text")}
              {renderInput("ID Number", "idNumber", "text")}
              {renderInput(
                "Skills (use '||' to separate)",
                "skills"
              )}
              {renderInput(
                "Role",
                "role",
                "select",
                false,
                [
                  "",
                  "First Responder",
                  "Supply Coordinator",
                  "Shelter Manager",
                  "Transport Support",
                ]
              )}
              {renderInput(
                "Availability",
                "availability",
                "select",
                false,
                ["", "Today Evening", "Tomorrow Morning", "This Weekend", "Anytime"]
              )}
              {renderInput("Motivation", "motivation", "textarea")}
              {renderInput(
                "Observed Location",
                "observedLocation",
                "select",
                false,
                ["", "Tadepalli", "Guntur", "Vijayawada", "Kunchanapalli"]
              )}
              {renderInput("Observation", "observation", "textarea")}
              {renderInput(
                "Contribution",
                "contribution",
                "select",
                false,
                ["", "Food Donation", "Clothes", "Transport Support", "Time/Volunteering"]
              )}
            </div>

            <button
              type="submit"
              className="btn fw-bold w-100 py-3 mt-4"
              style={{
                backgroundColor: colors.red,
                borderColor: colors.red,
                fontSize: "1.25rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.orange)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.red)}
            >
              🚀 Submit Volunteer Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;

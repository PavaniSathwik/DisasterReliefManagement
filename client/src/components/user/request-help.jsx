import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const RequestHelp = () => {
  const [formData, setFormData] = useState({
    username: "",
    locality: "",
    time: "",
    peopleAffected: "",
    selectedDepartment: "",
    location: "",
    severity: "Moderate",
    requestId: "",
  });

  const localityRef = useRef(null);

  useEffect(() => {
    if (localityRef.current) localityRef.current.focus();
    generateRequestId();
    getCurrentLocation();
  }, []);

  const generateRequestId = () => {
    setFormData((prevData) => ({
      ...prevData,
      requestId: "REQ-" + Math.floor(Math.random() * 1000000),
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prevData) => ({ ...prevData, location: mapsUrl }));
          fetchLocality(latitude, longitude);
        },
        () => {
          setFormData((prevData) => ({
            ...prevData,
            location: "Location access denied.",
          }));
        }
      );
    }
  };

  const fetchLocality = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const locality = data.address?.city || data.address?.town || "Unknown locality";
      setFormData((prevData) => ({ ...prevData, locality }));
    } catch (error) {
      console.error("Error fetching locality:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/api/users/submit-emergency", formData);
      if (response.status === 201) {
        alert("Emergency request submitted successfully!");
      } else {
        alert("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(
        `Error submitting request: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <div className="alert alert-danger text-center p-3 rounded shadow-lg w-100">
        <h4 className="fw-bold mb-2">🚨 IMMEDIATE ACTION REQUIRED 🚨</h4>
        <p className="mb-0 small">In case of an emergency, every second counts. Please follow these crucial steps:</p>
        <ul className="list-unstyled text-start mt-2 small">
          <li className="mb-1"><span role="img" aria-label="camera">📸</span> **Capture the Scene:** If safe, take a clear photo or video. Visual evidence can be incredibly helpful.</li>
          <li className="mb-1"><span role="img" aria-label="location">📍</span> **Pinpoint Your Location:** Ensure the provided location is accurate. This helps responders reach you faster.</li>
          <li className="mb-1"><span role="img" aria-label="clock">⏳</span> **Note the Time:** Specify when the incident occurred as precisely as possible.</li>
          <li className="mb-1"><span role="img" aria-label="people">👥</span> **Count Affected Individuals:** Provide the number of people who need assistance.</li>
          <li className="mb-1"><span role="img" aria-label="warning">⚠️</span> **Assess Severity:** Choose the most accurate severity level to prioritize the response.</li>
          <li className="mb-1"><span role="img" aria-label="department">🛑</span> **Select the Right Team:** Choose the department best suited to handle the emergency.</li>
        </ul>
        <button
          className="btn btn-md btn-primary w-100 mt-2"
          onClick={() => window.location.href = 'tel:112'}
        >
          <span role="img" aria-label="phone">📞</span> **Call Emergency Services (Direct)**
        </button>
        <p className="mt-1 text-muted x-small">This button connects you directly to emergency services.</p>
      </div>

      <div className="card p-3 shadow-lg border-3 border-danger w-100 mt-3">
        <h5 className="text-center text-danger fw-bold mb-3">Report an Emergency</h5>
        <p className="text-center text-muted mb-3 small">Your unique tracking ID: <span className="fw-bold">{formData.requestId}</span></p>

        <form onSubmit={handleSubmit} className="d-flex flex-column">
          {[
            { label: "🧑‍💻 Your Name", name: "username", type: "text", required: true },
            { label: "📍 Current Locality", name: "locality", type: "text", readOnly: true, ref: localityRef },
            { label: "🗺️ Incident Location (Google Maps)", name: "location", type: "text", readOnly: true },
            { label: "⏱️ Time of Incident", name: "time", type: "datetime-local", required: true },
            { label: " пострадавших Number of People Affected", name: "peopleAffected", type: "number", required: true },
          ].map(({ label, name, type, required, readOnly, ref }, index) => (
            <div className="mb-2" key={index}>
              <label htmlFor={name} className="form-label fw-semibold small">{label}:</label>
              <input
                type={type}
                className="form-control form-control-sm"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                readOnly={readOnly}
                ref={ref}
              />
            </div>
          ))}

          {[
            { label: "🚨 Type of Emergency", name: "selectedDepartment", options: ["Fire", "Medical", "Police", "Rescue Team"] },
            { label: "⚠️ Severity Level", name: "severity", options: ["Critical", "Severe", "Moderate", "Low"] },
          ].map(({ label, name, options }, index) => (
            <div className="mb-2" key={index}>
              <label htmlFor={name} className="form-label fw-semibold small">{label}:</label>
              <select
                className="form-select form-select-sm"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                {options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          <button type="submit" className="btn btn-sm btn-danger w-100 fw-bold">
            <span role="img" aria-label="siren">🚨</span> Submit Emergency Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelp;
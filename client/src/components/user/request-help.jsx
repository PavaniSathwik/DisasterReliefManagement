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
    photos: [], // array of Base64 strings for images
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
      requestId: "REQ-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0"),
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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();

      const addr = data.address || {};

      const locality =
        addr.suburb ||
        addr.neighbourhood ||
        addr.village ||
        addr.town ||
        addr.city ||
        addr.county ||
        addr.state_district ||
        addr.state ||
        "Unknown locality";

      const combined = [addr.suburb, addr.city || addr.state].filter(Boolean).join(", ");

      setFormData((prevData) => ({
        ...prevData,
        locality: combined || locality,
      }));
    } catch (error) {
      console.error("Error fetching locality:", error);
      setFormData((prevData) => ({
        ...prevData,
        locality: "Unknown locality",
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/users/submit-emergency",
        formData
      );
      if (response.status === 201) {
        alert("Emergency request submitted successfully!");
        // Optionally reset or navigate
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

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photosArr = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        photosArr.push(reader.result);

        if (photosArr.length === files.length) {
          setFormData((prev) => ({ ...prev, photos: photosArr }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: 600 }}>
      {/* Urgency Alert */}
      <div className="alert alert-danger text-center p-4 rounded shadow-lg">
        <h4 className="fw-bold mb-3">
          🚨 IMMEDIATE ACTION REQUIRED 🚨
        </h4>
        <p className="mb-2 small">
          In case of an emergency, every second counts. Please follow these crucial steps:
        </p>
        <ul className="list-unstyled text-start small mb-3">
          <li className="mb-2">
            <span role="img" aria-label="camera">📸</span> <strong>Capture the Scene:</strong> If safe, take clear photos or videos. Visual evidence helps responders.
          </li>
          <li className="mb-2">
            <span role="img" aria-label="location">📍</span> <strong>Pinpoint Your Location:</strong> Verify the provided location is accurate for faster help.
          </li>
          <li className="mb-2">
            <span role="img" aria-label="clock">⏳</span> <strong>Note the Time:</strong> Specify when the incident occurred as precisely as possible.
          </li>
          <li className="mb-2">
            <span role="img" aria-label="people">👥</span> <strong>Count Affected Individuals:</strong> Provide the number of people needing assistance.
          </li>
          <li className="mb-2">
            <span role="img" aria-label="warning">⚠️</span> <strong>Assess Severity:</strong> Choose the severity level for prioritizing the response.
          </li>
          <li className="mb-2">
            <span role="img" aria-label="department">🛑</span> <strong>Select the Right Team:</strong> Pick the department best suited for the emergency.
          </li>
        </ul>
        <button
          className="btn btn-primary btn-lg w-100"
          onClick={() => (window.location.href = "tel:112")}
          aria-label="Call emergency services directly"
        >
          <span role="img" aria-label="phone">📞</span> Call Emergency Services (Direct)
        </button>
        <p className="mt-2 text-muted small">
          This button connects you directly to emergency services.
        </p>
      </div>

      {/* Form Card */}
      <div className="card shadow-lg border-danger border-3 mt-4 p-4">
        <h5 className="text-center text-danger fw-bold mb-4">
          Report an Emergency
        </h5>
        <p className="text-center text-muted small mb-4">
          Your unique tracking ID: <span className="fw-bold">{formData.requestId}</span>
        </p>

        <form onSubmit={handleSubmit} className="d-flex flex-column">
          {/* Photo Upload */}
          <div className="mb-3">
            <label htmlFor="photos" className="form-label fw-semibold">
              📷 Upload Photos/Videos (optional)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="form-control"
              id="photos"
              onChange={handlePhotoUpload}
            />
            {/* Preview thumbnails if available */}
            {formData.photos.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                {formData.photos.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "1px solid #ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Text Inputs */}
          {[
            { label: "🧑‍💻 Your Name", name: "username", type: "text", required: true, ref: localityRef, readOnly: false },
            { label: "📍 Current Locality", name: "locality", type: "text", required: false, readOnly: true },
            { label: "🗺️ Incident Location (Google Maps)", name: "location", type: "text", required: false, readOnly: true },
            { label: "⏱️ Time of Incident", name: "time", type: "datetime-local", required: true, readOnly: false },
            { label: "👥 Number of People Affected", name: "peopleAffected", type: "number", required: true, readOnly: false },
          ].map(({ label, name, type, required, readOnly, ref }) => (
            <div className="mb-3" key={name}>
              <label htmlFor={name} className="form-label fw-semibold">
                {label}
              </label>
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
                min={type === "number" ? 1 : undefined}
              />
            </div>
          ))}

          {/* Select Inputs */}
          {[
            { label: "🚨 Type of Emergency", name: "selectedDepartment", options: ["Fire", "Medical", "Police", "Rescue Team"], required: true },
            { label: "⚠️ Severity Level", name: "severity", options: ["Critical", "Severe", "Moderate", "Low"], required: true },
          ].map(({ label, name, options, required }) => (
            <div className="mb-3" key={name}>
              <label htmlFor={name} className="form-label fw-semibold">
                {label}
              </label>
              <select
                className="form-select form-select-sm"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
              >
                <option value="">Select an option</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-danger btn-lg w-100 fw-bold"
            aria-label="Submit emergency request"
          >
            🚨 Submit Emergency Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelp;

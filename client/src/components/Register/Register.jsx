import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios

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
    if (localityRef.current) {
      localityRef.current.focus();
    }
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
        async (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prevData) => ({
            ...prevData,
            location: mapsUrl,
          }));
          await fetchLocality(latitude, longitude);
        },
        () => {
          setFormData((prevData) => ({
            ...prevData,
            location: "Location access denied.",
          }));
        }
      );
    } else {
      setFormData((prevData) => ({
        ...prevData,
        location: "Geolocation not supported.",
      }));
    }
  };

  const fetchLocality = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const locality =
        data.address.city || data.address.town || data.address.village || "Unknown locality";
      setFormData((prevData) => ({ ...prevData, locality }));
    } catch (error) {
      console.error("Error fetching locality:", error);
    }
  };

  const departments = ["Fire", "Medical", "Police", "Rescue Team"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/api/users/submit-emergency", formData);
      
      // Handle the response based on status
      if (response.status === 200) {
        console.log("Emergency request submitted:", response.data);
        alert("Emergency request submitted successfully!");
      } else {
        console.error("Error:", response.data);
        alert("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting request");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="alert alert-danger text-center fw-bold p-4 rounded border border-dark shadow-lg">
            <h2 className="mb-3">🚨 EMERGENCY ALERT 🚨</h2>
            <p className="lead">Follow these steps to report an emergency:</p>
            <ul className="text-start fw-semibold" style={{ fontSize: "16px" }}>
              <li>📸 <strong>Capture Evidence:</strong> Take a clear photo/video.</li>
              <li>📍 <strong>Provide Accurate Location:</strong> Auto-detected or enter manually.</li>
              <li>⏳ <strong>Specify Time:</strong> Enter the exact time for response prioritization.</li>
              <li>👥 <strong>Impact:</strong> Mention the number of affected people.</li>
              <li>⚠️ <strong>Choose Severity:</strong> Critical, Severe, Moderate, or Low.</li>
              <li>🛑 <strong>Select Department:</strong> Fire, Medical, Police, Rescue Team.</li>
            </ul>
            <button className="btn btn-primary w-100" onClick={() => window.location.href = 'tel:911'}>
              📞 Call Emergency (Backup)
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-lg border-3 border-danger">
            <h2 className="text-center text-danger fw-bold mb-4">Request Emergency Help</h2>
            <p className="text-center text-muted">Tracking ID: {formData.requestId}</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold fs-5">🧑‍💻 Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">📍 Locality:</label>
                <input
                  type="text"
                  className="form-control"
                  name="locality"
                  value={formData.locality}
                  readOnly
                  ref={localityRef}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">📍 Location:</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">⏳ Time:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">👥 People Affected:</label>
                <input
                  type="number"
                  className="form-control"
                  name="peopleAffected"
                  value={formData.peopleAffected}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">🛑 Select Department:</label>
                <select
                  className="form-select"
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">⚠️ Severity:</label>
                <select
                  className="form-select"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="Critical">Critical</option>
                  <option value="Severe">Severe</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold fs-4">
                🚨 Submit Emergency Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHelp;

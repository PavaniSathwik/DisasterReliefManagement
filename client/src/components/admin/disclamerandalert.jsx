import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExclamationTriangle, FaSave, FaTrashAlt } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { Carousel } from 'react-bootstrap';

const AdminDisclaimer = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const availableDepartments = ["Fire", "Medical", "Rescue Team", "Police"];
  const statusOptions = [
    "Pending ⏳",
    "Team Assigned 🚑",
    "On the way 🚀",
    "Reached 📍",
    "Resolved ✅",
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/admin/emergencyrequests");
        setReports(response.data);
        console.log("📸 Fetched reports with photos:", response.data);
      } catch (err) {
        setError("Failed to load emergency requests");
        console.error("❌ Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedReports = [...reports];
    updatedReports[index] = { ...updatedReports[index], [field]: value };
    setReports(updatedReports);
  };

  const saveReport = async (index) => {
    const report = reports[index];
    try {
      await axios.post("http://localhost:3002/api/admin/update-emergency-status", {
        requestId: report.requestId,
        assignedDepartment: report.selectedDepartment,
        status: report.status,
        arrivalTime: report.arrivalTime,
        precautions: report.precautions,
      });
      alert("✅ Status updated successfully!");
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert("⚠️ Failed to update status!");
    }
  };

  const deleteReport = async (index) => {
    const report = reports[index];
    try {
      await axios.delete(`http://localhost:3002/api/admin/delete-emergency/${report._id}`);
      setReports(reports.filter((_, i) => i !== index));
      alert("🗑️ Report deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting report:", error);
      alert("⚠️ Failed to delete report!");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BiLoaderAlt className="spin-icon me-2" size={30} /> Fetching those urgent reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
        <FaExclamationTriangle className="me-2" /> {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">
        <FaExclamationTriangle className="me-2" /> Emergency Reports Dashboard
      </h2>

      {reports.length === 0 ? (
        <div className="alert alert-warning text-center">
          <FaExclamationTriangle className="me-2" /> No emergency reports at the moment.
        </div>
      ) : (
        <div className="row g-4">
          {reports.map((report, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card shadow-lg border-danger h-100">
                <div className="card-header bg-danger text-white text-center">
                  🚨 <strong>Request ID:</strong> {report.requestId} 🚨
                </div>

            {report.photos && report.photos.length > 0 && (
  <div className="text-center mb-3">
    <strong>📸 Uploaded Photos:</strong>
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
      {report.photos && report.photos.length > 0 && (
  <Carousel interval={null} variant="dark" className="mb-3">
    {report.photos.map((photo, idx) => (
      <Carousel.Item key={idx}>
        <img
          className="d-block w-100"
          src={photo}
          alt={`Photo ${idx + 1}`}
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      </Carousel.Item>
    ))}
  </Carousel>
)}
    </div>
  </div>
)}


                <div className="card-body">
                  <h5 className="card-title">{report.username} - {report.locality}</h5>
                  <p className="card-text">
                    <strong>🕒 Time:</strong> {new Date(report.time).toLocaleString()}<br />
                    <strong>👥 People Affected:</strong> {report.peopleAffected}<br />
                    <strong>📡 Initial Dept:</strong> {report.selectedDepartment}
                  </p>

                  <div className="mb-2">
                    <label className="form-label">Assign Department</label>
                    <select
                      className="form-select"
                      value={report.selectedDepartment || "Fire"}
                      onChange={(e) => handleChange(index, "selectedDepartment", e.target.value)}
                    >
                      {availableDepartments.map((dept, i) => (
                        <option key={i} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={report.status || "Pending ⏳"}
                      onChange={(e) => handleChange(index, "status", e.target.value)}
                    >
                      {statusOptions.map((status, i) => (
                        <option key={i} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Arrival Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={report.arrivalTime || ""}
                      onChange={(e) => handleChange(index, "arrivalTime", e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Precautions</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter precautions..."
                      value={report.precautions || ""}
                      onChange={(e) => handleChange(index, "precautions", e.target.value)}
                    />
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-sm btn-success w-50 me-2" onClick={() => saveReport(index)}>
                    <FaSave className="me-1" /> Save
                  </button>
                  <button className="btn btn-sm btn-outline-danger w-50" onClick={() => deleteReport(index)}>
                    <FaTrashAlt className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDisclaimer;

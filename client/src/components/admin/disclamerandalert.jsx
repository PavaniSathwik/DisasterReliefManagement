import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExclamationTriangle, FaSave, FaTrashAlt, FaUserShield, FaCheckCircle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { Carousel } from "react-bootstrap";

const availableDepartments = ["Fire", "Medical", "Rescue Team", "Police"];
const statusOptions = [
  "Pending ⏳",
  "Team Assigned 🚑",
  "On the way 🚀",
  "Reached 📍",
  "Resolved ✅",
];

const getStatusProps = (status) => {
  switch (status) {
    case "Pending ⏳": return { color: "#dc3545", icon: <FaExclamationTriangle />, label: "URGENT" };
    case "Team Assigned 🚑": return { color: "#fd7e14", icon: <FaUserShield />, label: "ASSIGNED" };
    case "On the way 🚀": return { color: "#0d6efd", icon: <FaUserShield />, label: "MOVING" };
    case "Reached 📍": return { color: "#198754", icon: <FaCheckCircle />, label: "REACHED" };
    case "Resolved ✅": return { color: "#198754", icon: <FaCheckCircle />, label: "RESOLVED" };
    default: return { color: "#6c757d", icon: null, label: "UNKNOWN" };
  }
};

const photoBlock = (report) =>
  report.photos && report.photos.length > 0 ? (
    <Carousel
      interval={null}
      variant="dark"
      className="w-100 mb-3"
      style={{ minWidth: "230px", maxWidth: "100%", minHeight: "330px", height: "330px" }}
    >
      {report.photos.map((photo, idx) => (
        <Carousel.Item key={idx} style={{ minHeight: "330px", height: "330px" }}>
          <img
            className="d-block w-100 h-100 rounded border border-danger"
            src={photo}
            alt={`Photo ${idx + 1}`}
            style={{
              objectFit: "cover",
              minHeight: "330px",
              height: "330px",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <div
      className="border bg-light d-flex align-items-center justify-content-center"
      style={{
        minHeight: "330px",
        height: "330px",
        width: "100%",
        color: "#ccc",
        fontSize: "24px",
      }}>
      No Photo
    </div>
  );

const AdminDisclaimer = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/admin/emergencyrequests");
        setReports(response.data);
      } catch {
        setError("Failed to load emergency requests");
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
    } catch {
      alert("⚠️ Failed to update status!");
    }
  };

  const deleteReport = async (index) => {
    const report = reports[index];
    try {
      await axios.delete(`http://localhost:3002/api/admin/delete-emergency/${report._id}`);
      setReports(reports.filter((_, i) => i !== index));
      alert("🗑️ Report deleted successfully!");
    } catch {
      alert("⚠️ Failed to delete report!");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BiLoaderAlt className="me-2" size={32} />
        Fetching urgent emergency reports...
      </div>
    );
  }
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
        <FaExclamationTriangle className="me-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-center mb-4 text-danger fw-bold">
        <FaExclamationTriangle className="me-2" />
        Emergency Reports Dashboard
      </h2>
      {reports.length === 0 ? (
        <div className="alert alert-warning text-center">
          <FaExclamationTriangle className="me-2" />
          No emergency reports at the moment.
        </div>
      ) : (
        <div className="row g-4">
          {reports.map((report, index) => {
            const statusProps = getStatusProps(report.status);
            return (
              <div className="col-lg-10 col-12 mx-auto" key={index}>
                <div className="card shadow border border-danger" style={{ background: "#fff", minHeight: "370px" }}>
                  {/* Header */}
                  <div className="card-header text-white d-flex align-items-center"
                    style={{
                      background: statusProps.color,
                      fontWeight: "700",
                      fontSize: "1.1rem"
                    }}>
                    <span className="d-flex align-items-center">
                      {statusProps.icon}
                      <span className="ms-2">{statusProps.label}</span>
                    </span>
                    <span className="ms-auto">{report.status}</span>
                  </div>
                  {/* Body: Flex row for full vertical photo left, fields right */}
                  <div className="card-body px-0 py-0">
                    <div className="d-flex flex-row" style={{ minHeight: "330px", height: "100%" }}>
                      {/* Left: Full height image/carousel */}
                      <div style={{ width: "32%", height: "100%", minWidth: "230px" }} className="bg-light d-flex align-items-center justify-content-center">
                        {photoBlock(report)}
                      </div>
                      {/* Right: Data/Form fields */}
                      <div className="flex-grow-1 p-4">
                        <h5 className="fw-bold mb-2 text-danger">{report.username} &ndash; {report.locality}</h5>
                        <div className="mb-3">
                          <strong>Time:</strong> {new Date(report.time).toLocaleString()}<br />
                          <strong>People Affected:</strong> {report.peopleAffected}<br />
                          <strong>Department:</strong> <span className="badge bg-danger">{report.selectedDepartment}</span>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 mb-2">
                            <label className="form-label fw-semibold">Assign Dept</label>
                            <select
                              className="form-select border-danger"
                              value={report.selectedDepartment || "Fire"}
                              onChange={(e) => handleChange(index, "selectedDepartment", e.target.value)}
                            >
                              {availableDepartments.map((dept, i) => (
                                <option key={i} value={dept}>
                                  {dept}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-2">
                            <label className="form-label fw-semibold">Status</label>
                            <select
                              className="form-select border-danger"
                              value={report.status || "Pending ⏳"}
                              onChange={(e) => handleChange(index, "status", e.target.value)}
                            >
                              {statusOptions.map((status, i) => (
                                <option key={i} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 mb-2">
                            <label className="form-label fw-semibold">Arrival Time</label>
                            <input
                              type="datetime-local"
                              className="form-control border-danger"
                              value={report.arrivalTime || ""}
                              onChange={(e) => handleChange(index, "arrivalTime", e.target.value)}
                            />
                          </div>
                          <div className="col-sm-6 mb-2">
                            <label className="form-label fw-semibold">Precautions</label>
                            <textarea
                              className="form-control border-danger"
                              value={report.precautions || ""}
                              onChange={(e) => handleChange(index, "precautions", e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row gap-2 mt-3 justify-content-center">
  <button
    className="btn btn-success d-flex align-items-center justify-content-center px-4"
    onClick={() => saveReport(index)}
  >
    <FaSave className="me-2" /> Save
  </button>
  <button
    className="btn btn-outline-danger d-flex align-items-center justify-content-center px-4"
    onClick={() => deleteReport(index)}
  >
    <FaTrashAlt className="me-2" /> Delete
  </button>
</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDisclaimer;

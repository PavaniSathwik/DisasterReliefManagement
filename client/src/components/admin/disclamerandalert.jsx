import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExclamationTriangle, FaSave, FaTrashAlt } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

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
        await axios.delete(`http://localhost:3002/api/admin/delete-emergency/${report.requestId}`);
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

      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="bg-danger text-white">
            <tr>
              <th>Username</th>
              <th>Locality</th>
              <th>Time</th>
              <th>Affected</th>
              <th>Requested</th>
              <th>Request ID</th>
              <th>Assigned Dept</th>
              <th>Status</th>
              <th>Arrival</th>
              <th>Precautions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-muted">
                  <FaExclamationTriangle className="text-warning me-2" /> No emergency reports at the moment.
                </td>
              </tr>
            ) : (
              reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.username}</td>
                  <td>{report.locality}</td>
                  <td>{new Date(report.time).toLocaleString()}</td>
                  <td>{report.peopleAffected}</td>
                  <td>{report.selectedDepartment}</td>
                  <td>{report.requestId}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={report.selectedDepartment || "Fire"}
                      onChange={(e) => handleChange(index, "selectedDepartment", e.target.value)}
                    >
                      {availableDepartments.map((department, i) => (
                        <option key={i} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={report.status || "Pending"}
                      onChange={(e) => handleChange(index, "status", e.target.value)}
                    >
                      {statusOptions.map((status, i) => (
                        <option key={i} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm"
                      value={report.arrivalTime || ""}
                      onChange={(e) => handleChange(index, "arrivalTime", e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="form-control form-control-sm"
                      placeholder="Precautions"
                      value={report.precautions || ""}
                      onChange={(e) => handleChange(index, "precautions", e.target.value)}
                    />
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-sm btn-outline-success" onClick={() => saveReport(index)}>
                        <FaSave className="me-1" /> Save
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReport(index)}>
                        <FaTrashAlt className="me-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDisclaimer;
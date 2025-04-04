import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove admin session
    navigate("/admin-login"); // Redirect to login page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#343a40",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Admin Logo */}
      <div>
        <img src="/Companylogo.png" alt="Company Logo" style={{ height: "50px" }} />
      </div>

      {/* Admin Navigation Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/admin/home" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/departmentadd" style={linkStyle}>Add Department</Link>
        <Link to="/admin/dept-team-member" style={linkStyle}>Add Team Member</Link>
        <Link to="/admin/disclaimer-alert" style={linkStyle}>Incident Alerts</Link>
        <Link to="/admin/user-management" style={linkStyle}>User Management</Link>
        <Link to="/admin/volunteerallotment" style={linkStyle}>Volunteer Approval</Link>
        <Link to="/admin/admin-donate" style={linkStyle}>Donate & Purpose</Link>
        <Link to="/admin/feedback" style={linkStyle}>FeedBack</Link>

      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} style={logoutButtonStyle}>
        <span style={{ fontWeight: "bold" }}>ADMIN</span> &nbsp; Logout
      </button>
    </div>
  );
}

// Reusable styles
const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
};

const logoutButtonStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  padding: "8px 16px",
  borderRadius: "4px",
  backgroundColor: "red",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export default AdminNavbar;

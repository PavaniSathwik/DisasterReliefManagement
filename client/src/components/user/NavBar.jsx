import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 20px", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      {/* LOGO */}
      <div onClick={() => navigate("/user/home")} style={{ cursor: "pointer" }}>
        <img src="/Companylogo.png" alt="Company Logo" style={{ height: "50px" }} />
      </div>

      {/* Navbar Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span onClick={() => navigate("/user/home")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Home</span>
        <span onClick={() => navigate("/user/announcements")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Announcements</span>
        <span onClick={() => navigate("/user/emergency-contacts")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Emergency Contacts</span>
        <span onClick={() => navigate("/user/request-help")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Request Help</span>
        <span onClick={() => navigate("/user/donate")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Donate</span>
        <span onClick={() => navigate("/user/volunteer")} style={{ fontWeight: "500", color: "black", cursor: "pointer" }}>Volunteer</span>
      </div>

      {/* Profile or Login/Register */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {username ? (
          <>
            <span style={{ fontWeight: "500", color: "black" }}>Welcome, {username}</span>
            <button
              onClick={handleLogout}
              style={{
                color: "white", fontWeight: "500", padding: "8px 16px",
                borderRadius: "4px", backgroundColor: "red", border: "none", cursor: "pointer"
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")} style={{ fontWeight: "500", color: "black", padding: "8px 16px", borderRadius: "4px", backgroundColor: "#f0f0f0", cursor: "pointer" }}>Login</span>
            <span onClick={() => navigate("/register")} style={{ fontWeight: "500", color: "white", padding: "8px 16px", borderRadius: "4px", backgroundColor: "#007bff", cursor: "pointer" }}>Register</span>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomNavbar;

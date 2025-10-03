import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

function ResponsiveAppBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user); // Convert user to boolean (true if exists)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* LOGO */}
      <div>
        <img src="/Companylogo.png" alt="Company Logo" style={{ height: "50px" }} />
      </div>

      {/* Navbar Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>
          Home
        </Link>
        
          <>
            
            
            <Link to="/emergency-contacts" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>
              Emergency Contacts
            </Link>
            <Link to="/announcements" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>
              Announcements
            </Link>
            <Link to="/admin-login" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>
              Admin
            </Link>
          </>
       
      </div>

      {/* Login/Register or Profile Dropdown */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor: "red",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "4px",
                backgroundColor: "#007bff",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ResponsiveAppBar;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaBell,
  FaBolt,
  FaHandsHelping,
  FaDonate,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExclamationTriangle as FaAlertTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const colors = {
  background: "#f0f4f8",
  cardBg: "#ffffff",
  primaryBlue: "#003366",
  secondaryBlue: "#1e4f8a",
  borderColor: "#d1d9e6",
  textColor: "#2c3e50",
  dangerRed: "#c0392b",
  orangeWarning: "#e67e22",
  urgentRed: "#e84335",
  buttonBlue: "#0984e3",
  buttonGreen: "#00b894",
};

const containerStyle = {
  maxWidth: 900,
  margin: "40px auto",
  padding: "0 16px",
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  backgroundColor: colors.background,
  minHeight: "100vh",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: 40,
};

const titleStyle = {
  color: colors.primaryBlue,
  fontWeight: "700",
  fontSize: "2.5rem",
  marginBottom: 8,
};

const subtitleStyle = {
  color: colors.secondaryBlue,
  fontWeight: "500",
  fontSize: "1.2rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: 24,
};

const cardBaseStyle = {
  backgroundColor: colors.cardBg,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  padding: 24,
  color: colors.textColor,
  cursor: "default",
  transition: "box-shadow 0.3s ease",
  borderLeftWidth: 6,
  borderLeftStyle: "solid",
};

function IncidentCard({ incident }) {
  const getStatusColor = (status) => {
    if (!status) return colors.dangerRed;
    const s = status.toLowerCase();
    if (s.includes("resolved")) return "#27ae60";
    if (s.includes("assigned")) return colors.secondaryBlue;
    return colors.dangerRed;
  };

  const statusColor = getStatusColor(incident.status);

  return (
    <div
      style={{
        ...cardBaseStyle,
        borderLeftColor: statusColor,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = cardBaseStyle.boxShadow)
      }
    >
      <h3 style={{ color: colors.primaryBlue, marginBottom: 16, fontWeight: 700 }}>
        <FaBolt style={{ color: colors.urgentRed, marginRight: 8 }} />
        🚨 Incident Request #{incident.requestId}
      </h3>
      <p>
        <FaBuilding color={colors.secondaryBlue} />{" "}
        <strong>Department:</strong> {incident.assignedDepartment}
      </p>
      <p>
        <FaCheckCircle color={statusColor} /> <strong>Status:</strong>{" "}
        <span style={{ color: statusColor, fontWeight: 700 }}>
          {incident.status || "Unknown"}
        </span>
      </p>
      <p>
        <FaClock color={colors.primaryBlue} /> <strong>Arrival Time:</strong>{" "}
        {incident.arrivalTime
          ? new Date(incident.arrivalTime).toLocaleTimeString()
          : "N/A"}
      </p>
      <p>
        <FaExclamationTriangle color={colors.dangerRed} /> <strong>Precautions:</strong>{" "}
        {incident.precautions || "None"}
      </p>
    </div>
  );
}

const AlertsSection = ({ alerts }) => {
  const navigate = useNavigate(); // ✅ define navigate

  const getSeverityColor = (severity) => {
    if (severity.toLowerCase() === "red") return colors.urgentRed;
    if (severity.toLowerCase() === "orange") return colors.orangeWarning;
    if (severity.toLowerCase() === "yellow") return "#f1c40f";
    return colors.primaryBlue;
  };

  return (
    <section style={{ marginTop: 60 }}>
      <h2
        style={{
          borderBottom: `3px solid ${colors.secondaryBlue}`,
          color: colors.primaryBlue,
          paddingBottom: 8,
          marginBottom: 24,
          fontWeight: 700,
          fontSize: "1.8rem",
        }}
      >
        <FaBell style={{ marginRight: 8, verticalAlign: "middle" }} />
        Active Local Alerts &nbsp;
        <span
          style={{
            backgroundColor: colors.urgentRed,
            padding: "3px 12px",
            borderRadius: 12,
            fontSize: "0.9rem",
            color: "white",
            fontWeight: "700",
            verticalAlign: "middle",
          }}
        >
          URGENT
        </span>
      </h2>
      {alerts.length === 0 ? (
        <p style={{ color: colors.textColor, fontSize: "1rem" }}>
          No alerts at this time.
        </p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              borderLeft: `6px solid ${getSeverityColor(alert.severity)}`,
              color: colors.textColor,
              fontFamily:
                '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {/* Left info section */}
            <div style={{ flex: "1 1 60%", minWidth: 280 }}>
              <h3 style={{ color: colors.urgentRed, marginBottom: 8 }}>
                <FaAlertTriangle
                  style={{ marginRight: 8, verticalAlign: "middle" }}
                />
                {alert.title} &nbsp;{" "}
                <FaMapMarkerAlt style={{ verticalAlign: "middle" }} />{" "}
                <span style={{ fontWeight: "bold" }}>{alert.distance} km away</span>
              </h3>
              <p style={{ fontSize: "1rem", marginBottom: 8 }}>
                {alert.situation}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: 8 }}>
                <FaCalendarAlt />{" "}
                <em>
                  Reported on:{" "}
                  {new Date(alert.createdAt).toLocaleDateString()}
                </em>
              </p>
              <p style={{ fontWeight: "700", marginBottom: 0, color: colors.secondaryBlue }}>
                Required Help:{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {alert.helpType}
                </span>
              </p>
            </div>

            {/* Right action buttons */}
            <div
              style={{
                flex: "0 0 180px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minWidth: 160,
              }}
            >
              <button
                style={{
                  backgroundColor: colors.urgentRed,
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => alert("Redirecting to Donate page...")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d63031")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.urgentRed)
                }
              >
                <FaDonate /> Donate
              </button>
              <button
                style={{
                  backgroundColor: colors.buttonGreen,
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => navigate("/user/volunteer")} // ✅ now works
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#00b77a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.buttonGreen)
                }
              >
                <FaHandsHelping /> Volunteer
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default function AdminReplyPage() {
  const [incidentsData, setIncidentsData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const incidentsRes = await axios.get(
          "http://localhost:3002/api/users/emergency-statuses"
        );
        setIncidentsData(incidentsRes.data);
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (userId) {
          const alertsRes = await axios.get(
            `http://localhost:3002/api/users/alerts/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setAlertsData(alertsRes.data.alerts || []);
        }
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          color: colors.primaryBlue,
          textAlign: "center",
          marginTop: 40,
          fontWeight: "700",
          fontSize: "1.2rem",
        }}
      >
        Loading incident updates...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          color: colors.dangerRed,
          textAlign: "center",
          marginTop: 40,
          fontWeight: "700",
          fontSize: "1.2rem",
        }}
      >
        Error: {error}
      </div>
    );

  return (
    <main style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Incident Monitoring Dashboard</h1>
        <p style={subtitleStyle}>
          Official Emergency Incident Status and Alerts
        </p>
      </header>

      <section style={gridStyle}>
        {incidentsData.length === 0 ? (
          <p>No incident data available.</p>
        ) : (
          incidentsData.map((incident) => (
            <IncidentCard key={incident.requestId} incident={incident} />
          ))
        )}
      </section>

      <AlertsSection alerts={alertsData} />
    </main>
  );
}

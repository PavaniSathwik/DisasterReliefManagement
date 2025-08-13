import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBuilding, FaCheckCircle, FaClock, FaExclamationTriangle, FaNewspaper } from 'react-icons/fa';
import { motion } from "framer-motion"; // ✅ animation for motivational alert

const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.15)',
    transition: '0.3s',
    borderRadius: '10px',
    marginBottom: '25px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
};

const cardHoverStyle = {
    boxShadow: '0 6px 12px 0 rgba(0,0,0,0.15)',
};

const cardHeaderStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '10px 10px 0 0',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.2em',
};

const cardBodyStyle = {
    padding: '15px 18px',
    fontSize: '1em',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
};

const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
};

const pageHeaderStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
};

const pageHeaderTextStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
    margin: '0',
};

const AdminReplyCard = ({ incident }) => {
    const [isHovering, setIsHovering] = React.useState(false);
    const getStatusColor = (status) => {
        if (status && status.toLowerCase().includes('resolved')) return 'text-success';
        if (status && status.toLowerCase().includes('assigned')) return 'text-info';
        return 'text-warning';
    };

    const formatArrivalTime = (arrivalTime) => {
        if (arrivalTime) {
            const date = new Date(arrivalTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return 'N/A';
    };

    return (
        <div
            className="d-inline-block me-3 mb-3"
            style={{ ...cardStyle, ...(isHovering && cardHoverStyle) }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div style={cardHeaderStyle}>
                🚨 Request: {incident.requestId}
            </div>
            <div style={cardBodyStyle}>
                <div style={infoRowStyle}>
                    <FaBuilding className="me-2 text-info" style={{ fontSize: '1.1em' }} /> Dept: {incident.assignedDept}
                </div>
                <div style={infoRowStyle}>
                    <FaCheckCircle className={`me-2 ${getStatusColor(incident.status)}`} style={{ fontSize: '1.1em' }} /> Status: {incident.status}
                </div>
                <div style={infoRowStyle}>
                    <FaClock className="me-2 text-muted" style={{ fontSize: '1.1em' }} /> Arrival: {formatArrivalTime(incident.arrival)}
                </div>
                <div style={infoRowStyle}>
                    <FaExclamationTriangle className="me-2 text-danger" style={{ fontSize: '1.1em' }} /> Precautions: {incident.precautions || 'None'}
                </div>
            </div>
        </div>
    );
};

const AdminReplyPage = () => {
    const [incidentsData, setIncidentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmergencyStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/users/emergency-statuses');
                setIncidentsData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch emergency statuses');
                setLoading(false);
            }
        };

        fetchEmergencyStatuses();
    }, []);

    if (loading) {
        return <div>Loading emergency updates...</div>;
    }

    if (error) {
        return <div>Error loading updates: {error}</div>;
    }

    return (
        <div className="container mt-3">
            <div style={pageHeaderStyle}>
                <h2 style={pageHeaderTextStyle}>
                    <FaNewspaper className="me-2" /> Incident Updates
                </h2>
            </div>

           

            <div className="d-flex flex-wrap">
                {incidentsData.map((incident) => (
                    <AdminReplyCard
                        key={incident.requestId}
                        incident={{
                            requestId: incident.requestId,
                            assignedDept: incident.assignedDepartment,
                            status: incident.status,
                            arrival: incident.arrivalTime,
                            precautions: incident.precautions,
                        }}
                    />
                ))}
            </div>
             {/* 💡 Motivational Alert Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="alert alert-warning text-center fw-bold fs-5 py-3 px-4 mb-4"
                style={{
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffeeba",
                    borderRadius: "10px",
                    color: "#856404",
                }}
            >
                🙌 <strong>Your support can be the reason someone survives today.</strong> <br />
                Be the helping hand in someone’s darkest hour. Thank you for stepping up — your contribution saves lives!
            </motion.div>
        </div>
    );
};

export default AdminReplyPage;

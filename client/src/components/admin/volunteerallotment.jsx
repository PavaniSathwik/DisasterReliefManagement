import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerCard from "./VolunteerCard";

const AdminVolunteerReview = () => {
  const [volunteerList, setVolunteerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/users/volunteers");
      setVolunteerList(res.data);
    } catch (error) {
      console.error("Failed to fetch volunteers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleApprove = async (id, comment) => {
    console.log(`✅ Approved Volunteer ID: ${id} | Comment: ${comment}`);
    try {
      const res = await axios.patch(`http://localhost:3002/api/users/volunteer/${id}`, {
        status: "Approved",
        comment,
      });
      console.log("Approved:", res.data);
      alert("Volunteer approved successfully!");
      setVolunteerList((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: "Approved" } : v))
      );
    } catch (error) {
      console.error("Error approving volunteer:", error);
      alert("Error occurred while approving volunteer.");
    }
  };

  const handleReject = async (id, comment) => {
    console.log(`❌ Rejected Volunteer ID: ${id} | Comment: ${comment}`);
    try {
      const res = await axios.patch(`http://localhost:3002/api/users/volunteer/${id}`, {
        status: "Rejected",
        comment,
      });
      console.log("Rejected:", res.data);
      alert("Volunteer rejected.");
      setVolunteerList((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: "Rejected" } : v))
      );
    } catch (error) {
      console.error("Error rejecting volunteer:", error);
      alert("Error occurred while rejecting volunteer.");
    }
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "720px", backgroundColor: "#f5f6fa", borderRadius: "8px", padding: "24px", boxShadow: "0 2px 12px rgba(17,72,107,0.1)" }}
    >
      <h3
        className="text-center fw-bold mb-5"
        style={{ letterSpacing: "1.05px", fontSize: "2rem", color: "#11486b", fontFamily: "inherit" }}
      >
        Admin Volunteer Review
      </h3>

      {loading ? (
        <p className="text-center fst-italic text-secondary" style={{ fontSize: "1.1rem" }}>
          Loading volunteers...
        </p>
      ) : volunteerList.length === 0 ? (
        <p className="text-center fst-italic text-muted" style={{ fontSize: "1.1rem" }}>
          No volunteer applications found.
        </p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {volunteerList.map((volunteer) => (
            <div
              key={volunteer._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              }}
            >
              <VolunteerCard
                volunteer={{ ...volunteer, id: volunteer._id, name: volunteer.fullName }}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVolunteerReview;

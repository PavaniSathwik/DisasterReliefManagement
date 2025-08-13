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

      // Update the UI without full reload
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
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4">Admin Volunteer Review</h3>
      {loading ? (
        <p className="text-center">Loading volunteers...</p>
      ) : volunteerList.length === 0 ? (
        <p className="text-center">No volunteer applications found.</p>
      ) : (
        volunteerList.map((volunteer) => (
          <VolunteerCard
            key={volunteer._id}
            volunteer={{ ...volunteer, id: volunteer._id, name: volunteer.fullName }}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))
      )}
    </div>
  );
};

export default AdminVolunteerReview;

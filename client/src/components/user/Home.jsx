import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";

const UserHome = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  



useEffect(() => {
  // ✅ Always fetch email from localStorage
  const volunteerEmail = localStorage.getItem("volunteerEmail");
  console.log("📩 Fetching volunteer for email:", volunteerEmail);

  if (!volunteerEmail) {
    console.warn("⚠️ Volunteer email missing in localStorage");
    setLoading(false);
    return;
  }

  const fetchVolunteerStatus = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/api/users/volunteer-details",
        { params: { email: volunteerEmail } } // send email dynamically
      );

      console.log("✅ Volunteer data received:", res.data);
      setVolunteer(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch volunteer status:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  fetchVolunteerStatus();
}, []); // 🚀 empty array so effect runs only once after mount



  const getStatusColor = (status) => {
    if (status === "Approved") return "success";
    if (status === "Rejected") return "error";
    return "warning"; // Pending
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="position-relative w-100" style={{ height: "450px" }}>
        <img
          src="/disaster_scene.jpg"
          alt="Disaster Management"
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.8 }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center bg-dark bg-opacity-50 px-3">
          <motion.h1
            className="display-4 fw-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, {volunteer?.fullName || "User"}
          </motion.h1>
          <motion.p
            className="lead mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to your dashboard!
          </motion.p>
        </div>
      </div>

      {/* Status Section */}
      <Box className="container py-5 d-flex justify-content-center">
        {loading ? (
          <CircularProgress />
        ) : volunteer ? (
          <Card sx={{ width: 600, p: 3, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Volunteer Application Status
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                <Chip
                  label={volunteer.status}
                  color={getStatusColor(volunteer.status)}
                  size="small"
                />
              </Typography>

              {volunteer.status === "Approved" && (
                <Typography sx={{ mt: 2 }} color="primary">
                  🎉 Thanks for stepping up to help — it truly means a lot.
                  <br />
                  Our team will contact you shortly. Stay ready!
                </Typography>
              )}

              {volunteer.adminComment && (
                <Typography sx={{ mt: 2 }} color="text.secondary">
                  <strong>Admin Comment:</strong> {volunteer.adminComment}
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Your Submitted Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>ID Type:</strong> {volunteer.idType}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>ID Number:</strong> {volunteer.idNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Skills:</strong> {volunteer.skills?.join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Role:</strong> {volunteer.role}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Availability:</strong> {volunteer.availability}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Motivation:</strong> {volunteer.motivation}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Observed Location:</strong> {volunteer.observedLocation}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Observation:</strong> {volunteer.observation}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Contribution:</strong> {volunteer.contribution}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" color="error">
            Unable to load volunteer data.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default UserHome;

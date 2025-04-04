import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove login session
    navigate("/admin-login"); // Redirect back to Admin Login
  };

  // Dummy Data for Disaster Reports
  const disasterReports = [
    { id: 1, location: "California, USA", type: "Wildfire", status: "Pending" },
    { id: 2, location: "Tokyo, Japan", type: "Earthquake", status: "Verified" },
    { id: 3, location: "Mumbai, India", type: "Flood", status: "In Progress" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: "#2C3E50" }}>Admin Dashboard</Typography>
      <Typography variant="body1" sx={{ mb: 5, color: "#7F8C8D" }}>
        Welcome, Admin! Manage disaster reports, donations, and volunteers.
      </Typography>
      
      {/* Dashboard Stats */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#E74C3C", color: "white", textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Reports</Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Volunteers</Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#F39C12", color: "white", textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Donations</Typography>
              <Typography variant="h4">$5,000</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Disaster Reports Table */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2, color: "#34495E" }}>Disaster Reports</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2C3E50" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disasterReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.location}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: report.status === "Verified" ? "green" : "red" }}>
                  {report.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 4, py: 1.5, px: 4, fontSize: "16px", fontWeight: "bold" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
}
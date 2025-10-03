import React, { useState, useEffect } from "react";
import {
  Container, Typography, TextField, Button,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box
} from "@mui/material";
import axios from "axios";

export default function AdminDepartment() {
  // State definitions
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);

  // Fetch departments when component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch all departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/admin/departments");
      setDepartments(response.data);
    } catch (error) {
      alert("Failed to load departments. Please try again.");
    }
  };

  // Add a department
  const handleAddDepartment = async () => {
    if (!departmentName.trim()) {
      alert("Department name cannot be empty!");
      return;
    }
    try {
      await axios.post("http://localhost:3002/api/admin/departments", { name: departmentName });
      fetchDepartments();
      setDepartmentName("");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add department.");
    }
  };

  // Delete a department
  const handleDeleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`http://localhost:3002/api/admin/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete department.");
    }
  };

  // Main return block with professional government style
  return (
    <Container maxWidth="md" sx={{
      mt: 7,
      mb: 5,
      background: "#f5f6fa",
      borderRadius: 2,
      boxShadow: "0 2px 12px rgba(17,72,107,0.05)",
      minHeight: "70vh",
      p: 3
    }}>
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    fontWeight: "bold",
    color: "#11486b",
    mt: 2,
    mb: 3,
    letterSpacing: "1px",
    fontFamily: "inherit",
    textAlign: "center",
  }}
>
  Department Management
</Typography>
 <Box
  sx={{
    display: "flex",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",  // Center horizontally
    mb: 3,
    width: "100%",
  }}
>
  <TextField
    label="Department Name"
    value={departmentName}
    onChange={(e) => setDepartmentName(e.target.value)}
    sx={{
      width: "300px",
      background: "#fff",
      borderRadius: 1,
    }}
    size="small"
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddDepartment}
    sx={{
      fontWeight: "bold",
      borderRadius: 1,
      boxShadow: "none",
      textTransform: "none",
      background: "#11486b",
      ":hover": { background: "#0d3550" },
      minWidth: "80px"
    }}
  >
    Add
  </Button>
</Box>

      <TableContainer component={Paper} sx={{
        borderRadius: 1,
        boxShadow: "none",
        background: "#ffffff"
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#11486b" }}>
              <TableCell sx={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                width: 60
              }}>#</TableCell>
              <TableCell sx={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center"
              }}>Department Name</TableCell>
              <TableCell sx={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                width: 150
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept, idx) => (
              <TableRow key={dept._id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eaeaea" } }}>
                <TableCell sx={{ textAlign: "center" }}>{idx + 1}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{dept.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteDepartment(dept._id)}
                    sx={{
                      fontWeight: "bold",
                      borderRadius: 1,
                      boxShadow: "none",
                      textTransform: "none",
                      background: "#ac2b49",
                      ":hover": { background: "#881f33" }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* Show info if no departments */}
            {departments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} sx={{
                  textAlign: "center", color: "#11486b", py: 2
                }}>
                  No departments available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

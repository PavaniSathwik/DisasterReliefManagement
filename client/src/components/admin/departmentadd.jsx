import React, { useState, useEffect } from "react";
import {
  Container, Typography, TextField, Button,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box
} from "@mui/material";
import axios from "axios";

export default function AdminDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/admin/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("❌ Error fetching departments:", error);
      alert("Failed to load departments. Please try again.");
    }
  };

  const handleAddDepartment = async () => {
    if (!departmentName.trim()) {
      alert("Department name cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:3002/api/admin/departments", { 
        name: departmentName
       });
      fetchDepartments();
      setDepartmentName("");
    } catch (error) {
      console.error("❌ Error adding department:", error);
      alert(error.response?.data?.error || "Failed to add department.");
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      const response = await axios.delete(`http://localhost:3002/api/admin/departments/${id}`);
      console.log("✅ Department deleted:", response.data);
      fetchDepartments();
    } catch (error) {
      console.error("❌ Error deleting department:", error);
      alert(error.response?.data?.error || "Failed to delete department.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Manage Departments
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
        <TextField
          label="Department Name"
          fullWidth
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          sx={{ width: "70%", mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDepartment}
          sx={{
            width: "50%",
            backgroundColor: "#1976D2",
            ":hover": { backgroundColor: "#155A9A" },
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px"
          }}
        >
          Add Department
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4, borderRadius: "12px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept, index) => (
              <TableRow key={dept._id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" } }}>
                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{dept.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteDepartment(dept._id)}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      ":hover": { backgroundColor: "#B71C1C" }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

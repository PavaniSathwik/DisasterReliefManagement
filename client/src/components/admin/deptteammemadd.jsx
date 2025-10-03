import React, { useState, useEffect } from "react";
import {
  Container, Typography, TextField, Button,
  Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box
} from "@mui/material";
import axios from "axios";

const AdminTeamMember = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/admin/departments");
      setDepartments(response.data);
    } catch (error) {
      alert("Failed to load departments.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      alert("Failed to load employees.");
    }
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    if (!name.trim() || !department) {
      alert("Please enter all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:3002/api/admin/employees", {
        name,
        departmentId: department,
      });
      fetchEmployees();
      setName("");
      setDepartment("");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add employee.");
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3002/api/admin/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete employee.");
    }
  };

  return (
    <Container maxWidth="md" sx={{
      mt: 7,
      mb: 5,
      background: "#f5f6fa",
      borderRadius: 2,
      boxShadow: "0 2px 12px rgba(17,72,107,0.05)",
      minHeight: "70vh",
      p: 3,
      textAlign: "left"
    }}>
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: "bold",
        color: "#11486b",
        mt: 2,
        mb: 1,
        letterSpacing: "1px",
        fontFamily: "inherit"
      }}>
        Employee Management
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 3 }}>
        <form onSubmit={addEmployee} style={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              label="Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                width: "300px",
                background: "#fff",
                borderRadius: 1
              }}
              size="small"
              required
            />
            <FormControl sx={{ width: "300px", background: "#fff", borderRadius: 1 }} required>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept._id} value={dept._id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                borderRadius: 1,
                boxShadow: "none",
                textTransform: "none",
                background: "#11486b",
                ":hover": { background: "#0d3550" },
                minWidth: "120px"
              }}
            >
              Add
            </Button>
          </Box>
        </form>

        <TableContainer component={Paper} sx={{
          borderRadius: 1,
          boxShadow: "none",
          background: "#ffffff",
          mt: 3,
          width: "100%"
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#11486b" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>#</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Department</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{
                    textAlign: "center", color: "#11486b", py: 2
                  }}>
                    No employees added yet.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee, index) => (
                  <TableRow key={employee._id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#eaeaea" } }}>
                    <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{employee.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.department?.name || "N/A"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteEmployee(employee._id)}
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminTeamMember;

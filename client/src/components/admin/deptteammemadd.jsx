import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
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
      console.error("❌ Error fetching departments:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    if (!name || !department) return alert("Please enter all fields");

    try {
      await axios.post("http://localhost:3002/api/admin/employees", {
        name,
        departmentId: department, // Send department ID instead of name
      });
      fetchEmployees();
      setName("");
      setDepartment("");
    } catch (error) {
      console.error("❌ Error adding employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3002/api/admin/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Admin Employee Management
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
        <form onSubmit={addEmployee} className="mb-4" style={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              label="Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ width: "50%" }}
              required
            />
            <FormControl fullWidth sx={{ width: "50%" }} required>
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
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "30%",
              backgroundColor: "#1976D2",
              ":hover": { backgroundColor: "#155A9A" },
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Add Employee
          </Button>
        </form>

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Department</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center", color: "gray" }}>
                    No employees added yet.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee, index) => (
                  <TableRow key={employee._id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{employee.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.department?.name || "N/A"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteEmployee(employee._id)}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          borderRadius: "6px",
                          ":hover": { backgroundColor: "#B71C1C" },
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

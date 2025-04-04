import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3002/api/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}>
        Admin User Management
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>Loading users...</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Profile</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Username</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Phone</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Address</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center", color: "gray" }}>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user._id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#ddd",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#333" }}>
                          {user.username[0].toUpperCase()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.phone}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.address}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteUser(user._id)}
                        disabled={deleting}
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
      )}
    </Container>
  );
};

export default AdminUserManagement;

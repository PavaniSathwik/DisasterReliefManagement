import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin";

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true"); // ✅ Store login state
      navigate("/admin/home"); // ✅ Redirect to Admin Home
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth label="Email" type="email" margin="normal" variant="outlined"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth label="Password" type="password" margin="normal" variant="outlined"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#1565C0" } }}
          onClick={handleLogin}
        >
          Log in
        </Button>
      </Paper>
    </Container>
  );
}

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/users/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      navigate("/user/home");  // ✅ Redirect to User Home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Welcome!</Typography>
        <Typography variant="body2">Sign in to continue.</Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField fullWidth label="Email" type="email" margin="normal" variant="outlined"
          onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined"
          onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Log in</Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link href="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

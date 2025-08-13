// AdminHome.jsx
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Container, Typography, Button, Grid, Paper, TextField, Select, MenuItem,
  InputLabel, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel,
  Divider, Card, CardContent, Box, Table, TableHead, TableRow, TableCell,
  TableBody
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  const [title, setTitle] = useState("");
  const [situation, setSituation] = useState("");
  const [helpType, setHelpType] = useState("");
  const [distance, setDistance] = useState("");
  const [severity, setSeverity] = useState("green");

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  useEffect(() => {
    axios.get("http://localhost:3002/api/admin/emergencyrequests")
      .then(res => setRequests(res.data))
      .catch(err => console.error("Error fetching emergency requests:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3002/api/admin/emergency-statuses")
      .then(res => {
        setStatuses(res.data);
        const pending = res.data.filter(status => status.status === "Pending ⏳").length;
        setPendingCount(pending);
      })
      .catch(err => console.error("Error fetching statuses:", err));
  }, []);

  useEffect(() => {
    axios.get("https://gnews.io/api/v4/search?q=disaster&lang=en&country=in&max=6&apikey=f9cf5f6417c215cc52b44345a8ecbd05")
      .then(res => setNewsArticles(res.data.articles))
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3002/api/admin/submit-alert", {
        title,
        situation,
        helpType,
        distance,
        severity
      });
      alert("✅ Alert submitted!");
      setTitle("");
      setSituation("");
      setHelpType("");
      setDistance("");
      setSeverity("green");
    } catch (err) {
      console.error("❌ Error submitting alert:", err);
      alert("❌ Failed to submit alert");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container justifyContent="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#2C3E50" }}>
          Admin Dashboard
        </Typography>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#E8F5E9", borderLeft: "5px solid #43A047" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#2E7D32" }}>Total Help Requests</Typography>
              <Typography variant="h4">124</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#FFF3E0", borderLeft: "5px solid #FB8C00" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#EF6C00" }}>Active Alerts</Typography>
              <Typography variant="h4">{pendingCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, border: '1px solid #ccc' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recent Help Requests
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((req, index) => (
                  <TableRow key={req.requestId || index}>
                    <TableCell>{req.requestId || index + 1}</TableCell>
                    <TableCell>{req.username}</TableCell>
                    <TableCell>{req.selectedDepartment}</TableCell>
                    <TableCell>{req.locality}</TableCell>
                    <TableCell>{req.severity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, border: '1px solid #ccc' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              🚨 Report Nearby Incident
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Alert Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Incident Situation" multiline rows={3} fullWidth value={situation} onChange={(e) => setSituation(e.target.value)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="help-type-label">Help Required</InputLabel>
                  <Select labelId="help-type-label" value={helpType} label="Help Required" onChange={(e) => setHelpType(e.target.value)}>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="donate">Donate</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Distance from You (km)" type="number" fullWidth value={distance} onChange={(e) => setDistance(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Danger Severity</FormLabel>
                  <RadioGroup row value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <FormControlLabel value="green" control={<Radio sx={{ color: "green" }} />} label="Green" />
                    <FormControlLabel value="yellow" control={<Radio sx={{ color: "orange" }} />} label="Yellow" />
                    <FormControlLabel value="red" control={<Radio sx={{ color: "red" }} />} label="Red" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="error" fullWidth sx={{ fontWeight: 'bold' }} onClick={handleSubmit}>
                  Submit Alert
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              🌍 Live Danger Zones Map — Vijayawada & Tadepalli
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: "500px", width: "100%" }}>
              <MapContainer center={[16.495, 80.624]} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%", borderRadius: "12px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Circle center={[16.4836, 80.6001]} radius={3000} pathOptions={{ color: "red", fillOpacity: 0.5 }}>
                  <Popup>🔴 Red Zone: Tadepalli — Critical</Popup>
                </Circle>
                <Circle center={[16.5000, 80.6200]} radius={2000} pathOptions={{ color: "orange", fillOpacity: 0.5 }}>
                  <Popup>🟠 Orange Zone: River Area — Warning</Popup>
                </Circle>
                <Circle center={[16.5150, 80.6550]} radius={2000} pathOptions={{ color: "yellow", fillOpacity: 0.5 }}>
                  <Popup>🟡 Yellow Zone: Vijayawada — Monitor</Popup>
                </Circle>
              </MapContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={4} sx={{
            p: 4, mt: 4, borderRadius: 4, backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: "#2c3e50" }}>
              📰 Latest Disaster News (India)
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {newsArticles.length > 0 ? (
                newsArticles.map((article, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Card elevation={3} sx={{
                      height: "100%",
                      borderRadius: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                      },
                    }}>
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: "100%", height: 180, objectFit: "cover",
                            borderTopLeftRadius: 12, borderTopRightRadius: 12
                          }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#34495e", mb: 1 }}>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {article.description || "No description available."}
                        </Typography>
                        <a href={article.url} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                          🔗 Read full article
                        </a>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary">
                    No news available at the moment.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

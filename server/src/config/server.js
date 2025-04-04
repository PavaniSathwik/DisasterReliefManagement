const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("../routes/adminRoutes"); // Ensure correct path
const userRoutes = require("../routes/userRoutes");   // Ensure correct path
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

// MongoDB connection (Removed deprecated options)
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

const path = require("path"); // ✅ Import the 'path' module

app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Serves uploaded images


// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("../routes/adminRoutes"); 
const userRoutes = require("../routes/userRoutes");   
const bodyParser = require("body-parser");
const path = require("path"); 
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json());

// ✅ MongoDB connection (local MongoDB)
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

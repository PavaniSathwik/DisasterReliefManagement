const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EmergencyStatus = require('../models/EmergencyStatus');
const Volunteer = require("../models/volunteerModel");
const SECRET_KEY = 'yourSecretKey';
const multer = require("multer");

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, fullName, email, password, phone, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, fullName, email, password, phone, address });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};


const EmergencyRequest = require('../models/EmergencyRequest'); // Ensure this is the correct model path


// controllers/userController.js

// Submit an emergency request
// controllers/userController.js
// userController.js
exports.submitEmergencyRequest = async (req, res) => {
    try {
      // Destructure incoming request body
      const {
        username,
        locality,
        time,
        peopleAffected,
        selectedDepartment,
        location,
        severity,
        requestId,
      } = req.body;
  
      // Log the incoming request for debugging
      console.log("Received emergency request:", req.body);
  
      // Create a new EmergencyRequest document
      const newRequest = new EmergencyRequest({
        username,
        locality,
        time,
        peopleAffected,
        selectedDepartment,
        location,
        severity,
        requestId,
      });
  
      // Save the request to the database
      await newRequest.save();
  
      // Respond with success
      res.status(201).json({
        message: "Emergency request submitted successfully",
        data: newRequest,
      });
    } catch (err) {
      // Log the error for debugging
      console.error("Error submitting emergency request:", err);
  
      // Send the error message back in the response
      res.status(500).json({
        message: "Error submitting emergency request",
        error: err.message,
      });
    }
  };
  
  exports.getAllEmergencyStatuses = async (req, res) => {
    try {
        const allStatuses = await EmergencyStatus.find().sort({ createdAt: -1 });
        res.status(200).json(allStatuses);
    } catch (err) {
        console.error("Error fetching all emergency statuses:", err);
        res.status(500).json({
            message: "Error fetching emergency statuses",
            error: err.message,
        });
    }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure "uploads/" directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware for file upload
exports.uploadMiddleware = upload.single("profilePicture");

// Register a Volunteer
exports.registerVolunteer = async (req, res) => {
  try {
    const { fullName, location, request, qualification, capabilities } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if (!fullName || !location || !request || !qualification || !capabilities) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVolunteer = new Volunteer({ fullName, location, request, qualification, capabilities, profilePicture });
    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering volunteer", error: error.message });
  }
};
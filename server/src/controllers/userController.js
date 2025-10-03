const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EmergencyStatus = require('../models/EmergencyStatus');
const Volunteer = require("../models/volunteerModel");
const SECRET_KEY = 'yourSecretKey';
const multer = require("multer");
const bcrypt = require("bcrypt"); // ✅
const Alert = require("../models/Alert");
const Donation = require("../models/Donation");
 // adjust path if needed

const { loginUser } = require('../controllers/authController');

// router.post("/login", loginUser);

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      phone,
      address
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login User
// backend/controllers/userController.js
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send back user info and token
    res.status(200).json({
      message: "Login successful",
      token,
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
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
        photos,
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
        photos,
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
    const {
      fullName,
      age,
      gender,
      contact,
      email,
      locality,
      idType,
      idNumber,
      skills,
      role,
      availability,
      motivation,
      observedLocation,
      observation,
      contribution,
    } = req.body;

    const profilePicture = req.file ? req.file.filename : null;

    if (!fullName) {
      return res.status(400).json({ message: "Full Name is required" });
    }

    const newVolunteer = new Volunteer({
      fullName,
      age,
      gender,
      contact,
      email,
      locality,
      photo: profilePicture, // Match your DB field
      idType,
      idNumber,
      skills: Array.isArray(skills) ? skills : (skills || "").split(",").map(s => s.trim()),
      role,
      availability,
      motivation,
      observedLocation,
      observation,
      contribution,
    });

    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (error) {
    console.error("❌ Volunteer Register Error:", error);
    res.status(500).json({
      message: "Error registering volunteer",
      error: error.message,
    });
  }
};


exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    console.error("Error fetching volunteers", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// PATCH /api/users/volunteer/:id
exports.updateVolunteerStatus = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Optionally log or store comment

    res.status(200).json(updatedVolunteer);
  } catch (err) {
    console.error("Error updating volunteer status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.getVolunteerStatusByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(404).json({ message: "No volunteer record found for this email." });
    }

    res.json({
      fullName: volunteer.fullName,
      status: volunteer.status,
      adminComment: volunteer.adminComment || "",
    });
  } catch (err) {
    console.error("Error in getVolunteerStatusByEmail:", err);
    res.status(500).json({ message: "Server error while fetching volunteer status" });
  }
};

/////////////////////////////////////////////
exports.getVolunteerByEmail = async (req, res) => {
  // 1️⃣ Read email safely, trim spaces and lowercase
  const email = (req.query.email || "").trim().toLowerCase();

  if (!email) {
    return res.status(400).json({ message: "Email query parameter is required" });
  }

  try {
    // 2️⃣ Case-insensitive search in MongoDB
    const volunteer = await Volunteer.findOne({
      email: { $regex: `^${email}$`, $options: "i" }
    });

    if (!volunteer) {
      console.log("No volunteer found for email:", email); // Debug log
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};



////////////////////////////////////////
exports.getUserAlerts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log("👉 User.address:", JSON.stringify(user.address));

    // Fetch all alerts first (to confirm what's inside)
    const allAlerts = await Alert.find();
    console.log("👉 All alerts in DB:", allAlerts);

    // Case-insensitive match
    const alerts = await Alert.find({
      location: { $regex: new RegExp(user.address, "i") }
    });

    console.log("👉 Alerts found:", alerts);

    res.json({ success: true, alerts });
  } catch (err) {
    console.error("❌ Error fetching alerts:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


//////////////////////////////////////////////


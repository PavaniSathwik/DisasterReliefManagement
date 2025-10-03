// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require('../controllers/userController');
const { updateVolunteerStatus } = require('../controllers/userController');
const Donation = require("../models/Donation"); // directly use the model

// const { protect } = require("../middleware/authMiddleware");



router.post('/submit-emergency', userController.submitEmergencyRequest);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get("/alerts/:userId", userController.getUserAlerts);

// router.get('/volunteers/status', getVolunteerStatusByEmail);
router.get('/volunteers/status', userController.getVolunteerStatusByEmail);

router.get("/volunteer-details", userController.getVolunteerByEmail);

router.get("/volunteers", userController.getAllVolunteers);

router.patch('/volunteer/:id', updateVolunteerStatus);



  
  router.get('/emergency-statuses', userController.getAllEmergencyStatuses);
  router.post("/volunteer", userController.uploadMiddleware, userController.registerVolunteer);
  



// -------------------- Donation routes under /api/users --------------------
// Multer setup (for 3 photos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Donation route (POST /donation)
router.post(
  "/donation",
  upload.fields([
    { name: "packagedPhoto", maxCount: 1 },
    { name: "repPhoto", maxCount: 1 },
    { name: "donorWithRepPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, location, donationType, incident, message, amount, items } = req.body;

      const itemsArray = typeof items === "string"
        ? items.split(",").map(i => i.trim()).filter(Boolean)
        : [];

      const donation = new Donation({
        user: req.user?.id || null, // optional auth
        name,
        location,
        donationType,
        incident,
        message,
        amount,
        items: itemsArray,
        packagedPhoto: req.files?.packagedPhoto?.[0]?.filename || null,
        repPhoto: req.files?.repPhoto?.[0]?.filename || null,
        donorWithRepPhoto: req.files?.donorWithRepPhoto?.[0]?.filename || null,
      });

      await donation.save();
      res.status(201).json({ message: "Donation created successfully", donation });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error while creating donation" });
    }
  }
);

module.exports = router;
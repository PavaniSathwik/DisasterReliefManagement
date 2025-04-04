// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle emergency request submission
router.post('/submit-emergency', userController.submitEmergencyRequest);


// Define routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// Route to submit emergency request
  // Route to fetch all emergency requests



  router.get('/emergency-statuses', userController.getAllEmergencyStatuses);
  router.post("/volunteer", userController.uploadMiddleware, userController.registerVolunteer);
  

module.exports = router;

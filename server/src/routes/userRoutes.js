// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { updateVolunteerStatus } = require('../controllers/userController');





router.post('/submit-emergency', userController.submitEmergencyRequest);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


//router.get('/volunteers/status', getVolunteerStatusByEmail);



router.get("/volunteer-details", userController.getVolunteerByEmail);

router.get("/volunteers", userController.getAllVolunteers);

router.patch('/volunteer/:id', updateVolunteerStatus);



  
  router.get('/emergency-statuses', userController.getAllEmergencyStatuses);
  router.post("/volunteer", userController.uploadMiddleware, userController.registerVolunteer);
  

module.exports = router;

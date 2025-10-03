const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Department Routes
router.get("/departments", adminController.getAllDepartments);
router.post("/departments", adminController.createDepartment);
router.delete("/departments/:id", adminController.deleteDepartment);

// Employee Routes
router.get("/employees", adminController.getAllEmployees);
router.post("/employees", adminController.createEmployee);
router.put("/employees/:id", adminController.updateEmployee);
router.delete("/employees/:id", adminController.deleteEmployee);
router.post("/submit-alert", adminController.submitAlert);


// Inside router.js

// User Routes
router.get("/users", adminController.getAllUsers);  // Fetch all users
router.delete("/users/:id", adminController.deleteUser);  // Delete a user by ID


//Emergency requests routes
router.get("/emergencyrequests", adminController.getAllEmergencyRequests);
// OLD (remove this if it exists)
// ✅ NEW





router.get("/emergency-statuses", adminController.getAllEmergencyStatuses);

router.post("/update-emergency-status", adminController.updateEmergencyStatus);
router.delete("/delete-emergency/:id", adminController.deleteEmergencyRequest);




// backend/routes/adminRoutes.js
router.get("/donations", adminController.getAllDonations);





module.exports = router;

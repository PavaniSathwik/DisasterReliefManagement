const mongoose = require("mongoose");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const User = require('../models/User');
const EmergencyRequest = require('../models/EmergencyRequest'); // Adjust the path to where your model is located
const Alert = require("../models/Alert");
const EmergencyStatus = require("../models/EmergencyStatus");
// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        console.error("❌ Error fetching departments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: "Department name is required" });
        }

        const trimmedName = name.trim();
        const existingDepartment = await Department.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, "i") } });

        if (existingDepartment) {
            return res.status(400).json({ error: "Department already exists" });
        }

        const newDepartment = new Department({ name: trimmedName });
        await newDepartment.save();

        console.log("✅ Department created:", newDepartment);
        res.status(201).json({ message: "Department created successfully", department: newDepartment });
    } catch (error) {
        console.error("❌ Error creating department:", error);
        res.status(500).json({ error: "Failed to create department" });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid department ID" });
        }

        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }

        await Department.findByIdAndDelete(id);

        console.log("✅ Department deleted:", department);
        res.status(200).json({ message: "Department deleted successfully", deletedDepartment: department });
    } catch (error) {
        console.error("❌ Error deleting department:", error);
        res.status(500).json({ error: "Failed to delete department" });
    }
};

/* ------------------------------------ */
/* EMPLOYEE MANAGEMENT */
/* ------------------------------------ */

// Get all employees

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("department");
        res.status(200).json(employees);
    } catch (error) {
        console.error("❌ Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add an employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, departmentId } = req.body;

        if (!name || !departmentId) {
            return res.status(400).json({ error: "Employee name and department are required" });
        }

        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }

        const newEmployee = new Employee({ name, department: departmentId });
        await newEmployee.save();

        console.log("✅ Employee created:", newEmployee);
        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
    } catch (error) {
        console.error("❌ Error adding employee:", error);
        res.status(500).json({ error: "Failed to add employee" });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, departmentId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid employee ID" });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, department: departmentId },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        console.log("✅ Employee updated:", updatedEmployee);
        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        console.error("❌ Error updating employee:", error);
        res.status(500).json({ error: "Failed to update employee" });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid employee ID" });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        console.log("✅ Employee deleted:", deletedEmployee);
        res.status(200).json({ message: "Employee deleted successfully", deletedEmployee });
    } catch (error) {
        console.error("❌ Error deleting employee:", error);
        res.status(500).json({ error: "Failed to delete employee" });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Assuming you have a User model
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", deletedUser: user });
    } catch (error) {
        console.error("❌ Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
};

//get all emergency requests
exports.getAllEmergencyRequests = async (req, res) => {
    try {
        // Fetching emergency requests from MongoDB
        const emergencyRequests = await EmergencyRequest.find({}, {
            username: 1,
            locality: 1,
            time: 1,
            peopleAffected: 1,
            selectedDepartment: 1,
            location: 1,
            severity: 1,
            requestId: 1,
             photos: 1
        });

        // Sending the data as JSON response
        res.status(200).json(emergencyRequests);
    } catch (error) {
        console.error("❌ Error fetching emergency requests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateEmergencyStatus = async (req, res) => {
    try {
      const { requestId, assignedDepartment, status, arrivalTime, precautions } = req.body;
  
      if (!requestId) {
        return res.status(400).json({ message: "Request ID is required" });
      }
  
      const updatedStatus = await EmergencyStatus.findOneAndUpdate(
        { requestId },
        { assignedDepartment, status, arrivalTime, precautions },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: "Emergency status updated", data: updatedStatus });
    } catch (error) {
      console.error("Error updating emergency status:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



  exports.deleteEmergencyRequest = async (req, res) => {
      try {
          const { id } = req.params;
          const deletedRequest = await EmergencyRequest.findByIdAndDelete(id);
  
          if (!deletedRequest) {
              return res.status(404).json({ message: "Emergency request not found" });
          }
  
          res.json({ message: "Request deleted successfully" });
      } catch (error) {
          res.status(500).json({ message: "Error deleting request", error });
      }
  };
  
exports.getAllEmergencyStatuses = async (req, res) => {
  try {
    const statuses = await EmergencyStatus.find({});
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Error fetching emergency statuses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.submitAlert = async (req, res) => {
  try {
    const { title, situation, helpType, distance, severity } = req.body;

    if (!title || !situation || !helpType || !distance || !severity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAlert = new Alert({
      title,
      situation,
      helpType,
      distance,
      severity
    });

    await newAlert.save();

    res.status(201).json({ message: "Alert submitted successfully." });
  } catch (error) {
    console.error("Error submitting alert:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// models/EmergencyRequest.js
const mongoose = require('mongoose');

// Define the EmergencyRequest schema
const emergencyRequestSchema = new mongoose.Schema({
  username: { type: String, required: true },
  locality: { type: String, required: true },
  time: { type: Date, required: true },
  peopleAffected: { type: Number, required: true },
  selectedDepartment: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, required: true, enum: ['Critical', 'Severe', 'Moderate', 'Low'] },
  requestId: { type: String, required: true, unique: true },
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);

const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  username: { type: String, required: true },
  locality: { type: String, required: true },
  time: { type: Date, required: true },
  peopleAffected: { type: Number, required: true },
  selectedDepartment: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, required: true, enum: ['Critical', 'Severe', 'Moderate', 'Low'] },
  requestId: { type: String, required: true, unique: true },
  photos: [String] // ✅ Now supports multiple photos
}, { timestamps: true });

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);

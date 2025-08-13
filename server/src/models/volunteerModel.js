const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },  // map to volunteer.name
  age: Number,
  gender: String,
  contact: String,
  email: String,
  locality: String,
  photo: String,  // store image URL or base64 string
  idType: String,
  idNumber: String,
  skills: [String],
  role: String,
  availability: String,
  motivation: String,
  observedLocation: String,
  observation: String,
  contribution: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  adminComment: String,
}, { timestamps: true });

module.exports = mongoose.model("Volunteer", VolunteerSchema);

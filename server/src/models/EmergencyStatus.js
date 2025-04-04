const mongoose = require("mongoose");

const EmergencyStatusSchema = new mongoose.Schema({
  requestId: {
    type: String,  // ✅ Matches "REQ-XXXXX" format
    required: true,
    unique: true,
  },
  assignedDepartment: { type: String, default: "Fire" },
  status: { type: String, default: "Pending ⏳" },
  arrivalTime: { type: String, default: "" },
  precautions: { type: String, default: "" },
}, { timestamps: true });

const EmergencyStatus = mongoose.model("EmergencyStatus", EmergencyStatusSchema);
module.exports = EmergencyStatus;

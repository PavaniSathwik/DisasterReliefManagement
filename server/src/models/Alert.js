const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  situation: { type: String, required: true },
  helpType: { type: String, enum: ["volunteer", "donate", "both"], required: true },
  distance: { type: Number, required: true },
  severity: { type: String, enum: ["green", "yellow", "red"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);

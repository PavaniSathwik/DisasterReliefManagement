const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    location: String,
    donationType: { type: String, required: true },
    incident: { type: String, required: true },
    message: String,
    amount: String,
    items: [String],
    packagedPhoto: String,
    repPhoto: String,
    donorWithRepPhoto: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);

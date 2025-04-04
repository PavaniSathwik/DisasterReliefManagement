const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    request: { type: String, required: true },
    qualification: { type: String, required: true },
    capabilities: { type: String, required: true },
    profilePicture: { type: String }
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);

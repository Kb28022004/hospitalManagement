const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalId: {
    type: String,
    trim: true,
    unique: true,
  },
  hospitalName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  hospitalType: {
    type: String,
    enum: [
      "General Hospital",
      "Specialized Hospital",
      "Teaching Hospital",
      "Children’s Hospital",
      "Psychiatric Hospital",
      "Rehabilitation Center",
      "Maternity Hospital",
      "Military Hospital",
      "Cancer Hospital",
      "Orthopedic Hospital",
      "Neurology Hospital",
    ],
  },
  establishedYear: {
    type: Number,
  },
  hospitalCertificate: {
    public_id: { type: String,  },
    url: { type: String },
  },
  departments: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);

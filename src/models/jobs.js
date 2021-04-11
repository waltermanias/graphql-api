const mongoose = require("mongoose");

const JobModel = new mongoose.Schema(
  {
    leagueCode: { type: String, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ["WAITING", "IMPORTED", "FAILED"],
      default: "WAITING",
    },
    additionalInfo: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("jobs", JobModel, "jobs");

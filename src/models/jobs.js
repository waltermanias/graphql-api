const mongoose = require("mongoose");

const JobModel = new mongoose.Schema(
  {
    leagueCode: { type: String, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ["WAITING", "IN-PROGRESS", "COMPLETED", "FAILED", "SKIPPED"],
      default: "WAITING",
    },
    additionalInfo: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("jobs", JobModel, "jobs");

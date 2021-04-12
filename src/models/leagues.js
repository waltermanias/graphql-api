const mongoose = require("mongoose");

const LeagueModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    area: { type: String, required: true },
    code: { type: String, required: true, index: true },
    teams: [{ type: mongoose.Types.ObjectId, ref: "teams" }],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("leagues", LeagueModel, "leagues");

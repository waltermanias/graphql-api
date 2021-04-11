const mongoose = require("mongoose");

const CompetitionModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    area: { type: String, required: true },
    code: { type: String, required: true, index: true },
    teams: [{ type: mongoose.Types.ObjectId, ref: "teams" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "competitions",
  CompetitionModel,
  "competitions"
);

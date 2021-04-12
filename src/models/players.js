const mongoose = require("mongoose");

const PlayerModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    externalReference: { type: Number, required: true },
    position: { type: String, required: true },
    dateOfBirth: { type: Date },
    countryOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    team: {
      type: mongoose.Types.ObjectId,
      ref: "teams",
      index: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("players", PlayerModel, "players");

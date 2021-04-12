const mongoose = require("mongoose");

const TeamModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    tla: { type: String, required: true },
    area: { type: String, required: true },
    imageUrl: { type: String },
    externalReference: { type: Number, required: true, index: true },
  },
  { versionKey: false, toJSON: { virtuals: true }, timestamps: true }
);

TeamModel.virtual("players", {
  ref: "players",
  localField: "_id",
  foreignField: "team",
});

module.exports = mongoose.model("teams", TeamModel, "teams");

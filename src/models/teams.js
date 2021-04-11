const mongoose = require("mongoose");

const TeamModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    tla: { type: String, required: true },
    area: { type: String, required: true },
    imageUrl: { type: String },
    code: { type: String, required: true, index: true },
  },
  { versionKey: false, toJSON: { virtuals: true } }
);

TeamModel.virtual("players", {
  ref: "players",
  localField: "_id",
  foreignField: "team",
});

module.exports = mongoose.model("teams", TeamModel, "teams");

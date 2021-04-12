const mongoose = require("mongoose");

const League = require("../../models/leagues");

module.exports = () => {
  const create = async ({ name, area, code, externalReference, teams }) => {
    return new League({
      name,
      area,
      code,
      externalReference,
      teams: teams.map((team) => new mongoose.Types.ObjectId(team)),
    }).save();
  };

  const getByCode = async (code) => {
    return League.findOne({ code });
  };

  return { getByCode, create };
};

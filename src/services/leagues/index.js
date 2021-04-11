const mongoose = require("mongoose");

const League = require("../../models/competitions");

module.exports = () => {
  const create = async ({ name, area, code, teams }) => {
    return new League({
      name,
      area,
      code,
      teams: teams.map((team) => new mongoose.Types.ObjectId(team)),
    }).save();
  };

  const getByCode = async (code) => {
    // This code goes to the database

    const myLeague = await League.findOne().lean();
    return myLeague;
  };

  return { getByCode, create };
};

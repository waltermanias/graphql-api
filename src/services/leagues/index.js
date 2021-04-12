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

  const getByCode = async (code) => League.findOne({ code }).populate("teams");

  const getLeagues = ({ code }) => {
    const filter = {};
    if (code) filter.code = code;
    return League.find(filter).populate("teams");
  };

  return { getByCode, create, getLeagues };
};

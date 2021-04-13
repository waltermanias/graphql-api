const jobsModel = require("../models/jobs");
const teamsModel = require("../models/teams");
const leaguesModel = require("../models/leagues");
const playersModel = require("../models/players");

module.exports = async (req, res) => {
  await Promise.all([
    jobsModel.deleteMany({}),
    teamsModel.deleteMany({}),
    playersModel.deleteMany({}),
    leaguesModel.deleteMany({}),
  ]);

  await Promise.all([
    jobsModel.insertMany(require("./seeds/jobs")),
    teamsModel.insertMany(require("./seeds/teams")),
    playersModel.insertMany(require("./seeds/players")),
    leaguesModel.insertMany(require("./seeds/leagues")),
  ]);

  res.status(200).json({ seeded: true });
};

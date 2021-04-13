const env = require("dotenv");
env.config();

const jobsModel = require("../src/models/jobs");
const teamsModel = require("../src/models/teams");
const leaguesModel = require("../src/models/leagues");
const playersModel = require("../src/models/players");

const database = require("../src/database");

database
  .connect()
  .then(async (connection) => {
    await Promise.all([
      jobsModel.deleteMany({}),
      teamsModel.deleteMany({}),
      playersModel.deleteMany({}),
      leaguesModel.deleteMany({}),
    ]);
    await jobsModel.insertMany(require("./jobs"));
    console.log("Jobs imported...");
    await teamsModel.insertMany(require("./teams"));
    console.log("Teams imported...");
    await playersModel.insertMany(require("./players"));
    console.log("Players imported...");
    await leaguesModel.insertMany(require("./leagues"));
    console.log("Leagues imported...");

    await connection.disconnect();
    console.log("Done");
  })
  .catch((err) => {
    console.error(
      "There was an issue connecting to the database...",
      err.message
    );
  });

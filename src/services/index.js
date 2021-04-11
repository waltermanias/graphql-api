const leaguesApiService = require("./external-apis/leagues");
const teamsApiService = require("./external-apis/teams");
const leaguesService = require("./leagues");
const teamsService = require("./teams");
const playersService = require("./players");
const jobsService = require("./jobs");

module.exports = {
  leaguesApiService,
  teamsApiService,
  leaguesService,
  teamsService,
  playersService,
  jobsService,
};

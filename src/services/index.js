const LeaguesApiService = require("./external-apis/leagues");
const TeamsApiService = require("./external-apis/teams");
const LeaguesService = require("./leagues");
const TeamsService = require("./teams");
const PlayersService = require("./players");
const JobsService = require("./jobs");
const PubSubService = require("./pub-sub");

module.exports = {
  leaguesApiService: LeaguesApiService(),
  teamsApiService: TeamsApiService(),
  leaguesService: LeaguesService(),
  teamsService: TeamsService(),
  playersService: PlayersService(),
  jobsService: JobsService(),
  pubSubService: PubSubService(),
};

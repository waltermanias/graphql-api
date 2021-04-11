module.exports = (services) => ({
  leagues: require("./leagues")(services),
  teams: require("./teams")(services),
  players: require("./players")(services),
  jobs: require("./jobs")(services),
});

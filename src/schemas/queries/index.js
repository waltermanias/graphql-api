const graphql = require("graphql");

module.exports = (resolvers) => {
  const { getTeams } = require("./teams")(resolvers);
  // const { getLeagueByCode, getLeagues } = require("./leagues")(resolvers);
  // const { getPlayerByCode, getPlayers } = require("./players")(resolvers);
  // const { getJobs } = require("./jobs")(resolvers);

  const rootQueryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
      teams: getTeams,
      // getLeagueByCode,
      // getLeagues,
      // getPlayerByCode,
      // getPlayers,
      // getJobs,
      
    },
  });

  return {
    rootQueryType,
  };
};

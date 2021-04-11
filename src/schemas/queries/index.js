const graphql = require("graphql");

module.exports = (resolvers) => {
  const { getTeamByCode, getTeams } = require("./teams")(resolvers);
  const { getLeagueByCode, getLeagues } = require("./leagues")(resolvers);
  const { getPlayerByCode, getPlayers } = require("./players")(resolvers);

  const rootQueryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
      getTeamByCode,
      getTeams,
      getLeagueByCode,
      getLeagues,
      getPlayerByCode,
      getPlayers,
    },
  });

  return {
    rootQueryType,
  };
};

const graphql = require("graphql");

module.exports = (resolvers) => {
  const { typeDef: teamType } = require("../../types/team")(resolvers);

  const getTeams = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(teamType)),
    resolve: () => resolvers.teams.getTeams(),
  };

  return {
    getTeams,
  };
};

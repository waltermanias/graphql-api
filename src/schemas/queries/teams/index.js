const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getTeams = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(types.Team)),
    resolve: () => resolvers.teams.getTeams(),
  };

  return {
    getTeams,
  };
};

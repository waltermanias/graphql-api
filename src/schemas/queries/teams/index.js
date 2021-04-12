const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getTeams = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(types.Team)),
    args: {
      input: { type: types.InputTeamFilter },
    },
    resolve: (_, { input }) => resolvers.teams.getTeams(input),
  };

  return {
    getTeams,
  };
};

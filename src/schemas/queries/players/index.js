const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getPlayers = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(types.Player)),
    args: {
      input: { type: types.InputPlayerFilter },
    },
    resolve: (_, { input }) => resolvers.players.getPlayers(input),
  };
  return { getPlayers };
};

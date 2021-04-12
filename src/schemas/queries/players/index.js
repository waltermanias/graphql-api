const graphql = require("graphql");

module.exports = (resolvers) => {
  const { typeDef: playerType } = require("../../types/player")(resolvers);

  const getPlayers = {
    type: new graphql.GraphQLList(playerType),
    resolve: () => players.getPlayers(),
  };

  const getPlayerByCode = {
    type: playerType,
    args: {
      code: { type: graphql.GraphQLString },
    },
    resolve: (_, { code }) => resolvers.players.getPlayerByCode(code),
  };

  return { getPlayers, getPlayerByCode };
};

const graphql = require("graphql");
const { typeDef: playerType } = require("../../types/player");

module.exports = ({ players }) => {
  const getPlayers = {
    type: new graphql.GraphQLList(playerType),
    resolve: () => players.getPlayers(),
  };

  const getPlayerByCode = {
    type: playerType,
    args: {
      code: { type: graphql.GraphQLString },
    },
    resolve: (_, { code }) => players.getPlayerByCode(code),
  };

  return { getPlayers, getPlayerByCode };
};

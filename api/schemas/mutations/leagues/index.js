const graphql = require("graphql");
const { typeDef: leagueType } = require("../../types/league");

const importLeague = {
  type: leagueType,
  args: {
    code: { type: graphql.GraphQLString },
  },
  resolve: (_, { code }) => {
    return { code, name: "league A", id: 24 };
  },
};

module.exports = { importLeague };

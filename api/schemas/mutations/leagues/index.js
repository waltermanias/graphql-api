const graphql = require("graphql");
const {
  typeDef: leagueType,
  inputImportLeague,
} = require("../../types/league");

const importLeague = {
  type: leagueType,
  args: {
    input: { type: new graphql.GraphQLNonNull(inputImportLeague) },
  },
  resolve: (_, { leagueCode }) => {
    return { code: leagueCode, name: "league A", id: 24 };
  },
};

module.exports = { importLeague };

const graphql = require("graphql");
const {
  typeDef: leagueType,
  inputImportLeague,
} = require("../../types/league");

module.exports = (resolvers) => {
  const importLeague = {
    type: leagueType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputImportLeague) },
    },
    resolve: (_, { input: { leagueCode } }) => {
      return { code: leagueCode, name: "league A", id: 24 };
    },
  };
  return { importLeague };
};

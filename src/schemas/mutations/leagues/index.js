const graphql = require("graphql");
const {
  typeDef: leagueType,
  inputImportLeague,
} = require("../../types/league");

module.exports = ({ leagues }) => {
  const importLeague = {
    type: leagueType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputImportLeague) },
    },
    resolve: (_, { input: { leagueCode } }) => leagues.importLeague(leagueCode),
  };
  return { importLeague };
};

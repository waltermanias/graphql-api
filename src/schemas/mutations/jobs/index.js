const graphql = require("graphql");
const { typeDef: jobType, inputImportLeague } = require("../../types/job");

module.exports = ({ jobs }) => {
  const importLeague = {
    type: jobType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputImportLeague) },
    },
    resolve: (_, { input: { leagueCode } }) => jobs.importLeague(leagueCode),
  };
  return { importLeague };
};

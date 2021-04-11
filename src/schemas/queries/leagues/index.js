const graphql = require("graphql");
const { typeDef: leagueType } = require("../../types/league");

module.exports = ({ leagues }) => {
  const getLeagues = {
    type: new graphql.GraphQLList(leagueType),
    resolve: () => leagues.getLeagues(),
  };

  const getLeagueByCode = {
    type: leagueType,
    args: {
      code: { type: graphql.GraphQLString },
    },
    resolve: (_, { code }) => leagues.getLeagueByCode(code),
  };

  return { getLeagues, getLeagueByCode };
};

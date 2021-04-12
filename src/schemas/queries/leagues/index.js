const graphql = require("graphql");

module.exports = (resolvers) => {
  const { typeDef: leagueType } = require("../../types/league")(resolvers);

  const getLeagues = {
    type: new graphql.GraphQLList(leagueType),
    resolve: () => leagues.getLeagues(),
  };

  const getLeagueByCode = {
    type: leagueType,
    args: {
      code: { type: graphql.GraphQLString },
    },
    resolve: (_, { code }) => resolvers.leagues.getLeagueByCode(code),
  };

  return { getLeagues, getLeagueByCode };
};

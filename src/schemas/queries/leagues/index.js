const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getLeagues = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(types.League)),
    args: {
      input: { type: types.InputLeagueFilter },
    },
    resolve: (_, { input = { code: undefined } }) =>
      resolvers.leagues.getLeagues(input),
  };
  return { getLeagues };
};

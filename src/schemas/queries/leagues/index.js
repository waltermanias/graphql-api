const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getLeagues = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLList(types.League)),
    resolve: () => resolvers.leagues.getLeagues(),
  };
  return { getLeagues };
};

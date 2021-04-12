const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const getLeagues = {
    type: new graphql.GraphQLList(types.League),
    resolve: () => resolvers.leagues.getLeagues(),
  };
  return { getLeagues };
};

const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const { getTeams } = require("./teams")({ types, resolvers });
  const { getLeagues } = require("./leagues")({ types, resolvers });

  const rootQueryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
      teams: getTeams,
      leagues: getLeagues,
    },
  });

  return {
    rootQueryType,
  };
};

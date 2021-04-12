const graphql = require("graphql");

module.exports = (resolvers) => {
  const types = require("./types")(resolvers);

  const { rootQueryType } = require("./queries")({ types, resolvers });
  const { rootMutationType } = require("./mutations")({ types, resolvers });

  return {
    buildSchema: () =>
      new graphql.GraphQLSchema({
        query: rootQueryType,
        mutation: rootMutationType,
      }),
  };
};

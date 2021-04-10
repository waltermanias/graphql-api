const graphql = require("graphql");

module.exports = (resolvers) => {
  const { rootQueryType } = require("./queries")(resolvers);
  const { rootMutationType } = require("./mutations")(resolvers);
  return {
    buildSchema: () =>
      new graphql.GraphQLSchema({
        query: rootQueryType,
        mutation: rootMutationType,
      }),
  };
};

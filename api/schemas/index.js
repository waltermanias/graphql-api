const graphql = require("graphql");
const { rootQueryType } = require("./queries");
const { rootMutationType } = require("./mutations");

module.exports = {
  buildSchema: () =>
    new graphql.GraphQLSchema({
      query: rootQueryType,
      mutation: rootMutationType,
    }),
};

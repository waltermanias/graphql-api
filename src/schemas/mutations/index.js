const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const { createJob } = require("./jobs")({ types, resolvers });

  const rootMutationType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
      createJob,
    },
  });

  return {
    rootMutationType,
  };
};

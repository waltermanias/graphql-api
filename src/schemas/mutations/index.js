const graphql = require("graphql");

module.exports = (resolvers) => {
  const { createJob } = require("./jobs")(resolvers);

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

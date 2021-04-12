const graphql = require("graphql");

module.exports = (resolvers) => {
  const { typeDef: jobType } = require("../../types/job")(resolvers);

  const getJobs = {
    type: new graphql.GraphQLList(jobType),
    args: {
      status: { type: graphql.GraphQLString },
    },
    resolve: (_, { status }) => resolvers.jobs.getJobs({ status }),
  };

  return { getJobs };
};

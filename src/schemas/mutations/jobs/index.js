const graphql = require("graphql");

module.exports = (resolvers) => {
  const { typeDef: jobType, inputCreateJob } = require("../../types/job")(
    resolvers
  );

  const createJob = {
    type: jobType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputCreateJob) },
    },
    resolve: (_, { input: { leagueCode } }) =>
      resolvers.jobs.createJob(leagueCode),
  };
  return { createJob };
};

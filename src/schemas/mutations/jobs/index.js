const graphql = require("graphql");
const { typeDef: jobType, inputCreateJob } = require("../../types/job");

module.exports = ({ jobs }) => {
  const createJob = {
    type: jobType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputCreateJob) },
    },
    resolve: (_, { input: { leagueCode } }) => jobs.createJob(leagueCode),
  };
  return { createJob };
};

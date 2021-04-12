const graphql = require("graphql");

module.exports = ({ types, resolvers }) => {
  const createJob = {
    type: types.Job,
    args: {
      input: { type: new graphql.GraphQLNonNull(types.InputCreateJob) },
    },
    resolve: (_, { input: { leagueCode } }) =>
      resolvers.jobs.createJob(leagueCode),
  };
  return { createJob };
};

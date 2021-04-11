const graphql = require("graphql");
const { typeDef: jobType } = require("../../types/job");

module.exports = ({ jobs }) => {
  const getJobs = {
    type: new graphql.GraphQLList(jobType),
    args: {
      status: { type: graphql.GraphQLString },
    },
    resolve: (_, { status }) => jobs.getJobs({ status }),
  };

  return { getJobs };
};

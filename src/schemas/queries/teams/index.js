const graphql = require("graphql");
const { typeDef: teamType } = require("../../types/team");

module.exports = ({ teams }) => {
  const getTeams = {
    type: new graphql.GraphQLList(teamType),
    resolve: () => teams.getTeams(),
  };

  const getTeamByCode = {
    type: teamType,
    args: {
      code: { type: graphql.GraphQLString },
    },
    resolve: (_, { code }) => teams.getTeamByCode(code),
  };

  return {
    getTeams,
    getTeamByCode,
  };
};

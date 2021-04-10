const graphql = require("graphql");
const { typeDef: teamType } = require("../../types/team");

const teams = {
  type: new graphql.GraphQLList(teamType),
  resolve: () => {
    return [{ code: "code-1", name: "team A", id: 23 }];
  },
};

const team = {
  type: teamType,
  args: {
    code: { type: graphql.GraphQLString },
  },
  resolve: (_, { code }) => {
    return { code: code, name: "team A", id: 23 };
  },
};

module.exports = { teams, team };

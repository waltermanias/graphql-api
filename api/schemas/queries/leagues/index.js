const graphql = require("graphql");
const { typeDef: leagueType } = require("../../types/league");

const leagues = {
  type: new graphql.GraphQLList(leagueType),
  resolve: () => {
    return [{ code: "code-1", name: "league A", id: 23 }];
  },
};

const league = {
  type: leagueType,
  args: {
    code: { type: graphql.GraphQLString },
  },
  resolve: (_, { code }) => {
    return { code: code, name: "league A", id: 23 };
  },
};

module.exports = { leagues, league };

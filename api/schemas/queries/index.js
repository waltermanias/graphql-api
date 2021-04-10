const graphql = require("graphql");
const { team, teams } = require("./teams");
const { league, leagues } = require("./leagues");

const rootQueryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    team,
    teams,
    league,
    leagues,
  },
});

module.exports = { rootQueryType };

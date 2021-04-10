const graphql = require("graphql");

const { importTeam } = require("./teams");
const { importLeague } = require("./leagues");

const rootMutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    importTeam,
    importLeague,
  },
});

module.exports = { rootMutationType };

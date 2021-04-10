const graphql = require("graphql");

const typeDef = new graphql.GraphQLObjectType({
  name: "Team",
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
  },
});

const inputImportTeam = new graphql.GraphQLInputObjectType({
  name: "InputImportTeam",
  fields: {
    code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
});

module.exports = {
  typeDef,
  inputImportTeam,
};

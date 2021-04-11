const graphql = require("graphql");

const typeDef = new graphql.GraphQLObjectType({
  name: "Job",
  fields: {
    id: { type: graphql.GraphQLInt },
    leagueCode: { type: graphql.GraphQLString },
    status: { type: graphql.GraphQLString },
  },
});

const inputImportLeague = new graphql.GraphQLInputObjectType({
  name: "InputImportLeague",
  fields: {
    leagueCode: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
});

module.exports = {
  typeDef,
  inputImportLeague,
};

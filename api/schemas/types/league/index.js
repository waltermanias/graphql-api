const graphql = require("graphql");

const typeDef = new graphql.GraphQLObjectType({
  name: "League",
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
  },
});

const inputImportLeague = new graphql.GraphQLInputObjectType({
  name: "InputImportLeague",
  fields: {
    code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
});

module.exports = {
  typeDef,
  inputImportLeague,
};

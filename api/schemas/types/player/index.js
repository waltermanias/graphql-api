const graphql = require("graphql");

const typeDef = new graphql.GraphQLObjectType({
  name: "Player",
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
  },
});

const inputImportPlayer = new graphql.GraphQLInputObjectType({
  name: "InputImportPlayer",
  fields: {
    playerCode: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
});

module.exports = {
  typeDef,
  inputImportPlayer,
};

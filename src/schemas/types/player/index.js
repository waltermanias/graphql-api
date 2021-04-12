const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

const typeDef = new graphql.GraphQLObjectType({
  name: "Player",
  fields: {
    id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
    createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
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

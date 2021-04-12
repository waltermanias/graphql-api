const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

const typeDef = new graphql.GraphQLObjectType({
  name: "Player",
  fields: {
    id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    position: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    dateOfBirth: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    countryOfBirth: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    nationality: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    externalReference: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
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

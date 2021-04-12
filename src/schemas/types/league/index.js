const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

const typeDef = new graphql.GraphQLObjectType({
  name: "League",
  fields: {
    id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    area: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    code: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    externalReference: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
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

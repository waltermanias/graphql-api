const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

const typeDef = new graphql.GraphQLObjectType({
  name: "Team",
  fields: {
    id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
    createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
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

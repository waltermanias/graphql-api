const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

const typeDef = new graphql.GraphQLObjectType({
  name: "Job",
  fields: {
    id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
    leagueCode: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    status: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
  },
});

const inputCreateJob = new graphql.GraphQLInputObjectType({
  name: "InputCreateJob",
  fields: {
    leagueCode: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
});

module.exports = {
  typeDef,
  inputCreateJob,
};

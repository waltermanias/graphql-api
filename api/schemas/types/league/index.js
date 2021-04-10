const graphql = require("graphql");

const typeDef = new graphql.GraphQLObjectType({
  name: "League",
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
  },
});

module.exports = {
  typeDef,
};

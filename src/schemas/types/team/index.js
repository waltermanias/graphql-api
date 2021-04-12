const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

module.exports = (resolvers) => {
  const { typeDef: Player } = require("../player")(resolvers);

  const typeDef = new graphql.GraphQLObjectType({
    name: "Team",
    fields: {
      id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
      name: { type: graphql.GraphQLString },
      code: { type: graphql.GraphQLString },
      externalReference: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
      },
      players: {
        type: new graphql.GraphQLList(Player),
        resolve: ({ id }) => resolvers.players.getByTeam(id),
      },
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

  return {
    typeDef,
    inputImportTeam,
  };
};

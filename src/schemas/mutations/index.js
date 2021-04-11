const graphql = require("graphql");

module.exports = (resolvers) => {
  const { importTeam } = require("./teams")(resolvers);
  const { importLeague } = require("./leagues")(resolvers);

  const rootMutationType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
      importTeam,
      importLeague,
    },
  });

  return {
    rootMutationType,
  };
};

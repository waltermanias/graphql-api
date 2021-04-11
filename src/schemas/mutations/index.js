const graphql = require("graphql");

module.exports = (resolvers) => {
  // const { importTeam } = require("./teams")(resolvers);
  // const { importLeague } = require("./leagues")(resolvers);
  const { importLeague } = require("./jobs")(resolvers);

  const rootMutationType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
      importLeague,
    },
  });

  return {
    rootMutationType,
  };
};

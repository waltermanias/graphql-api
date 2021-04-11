const graphql = require("graphql");
const { typeDef: teamType, inputImportTeam } = require("../../types/team");

module.exports = (resolvers) => {
  const importTeam = {
    type: teamType,
    args: {
      input: { type: new graphql.GraphQLNonNull(inputImportTeam) },
    },
    resolve: (_, { input }) => {
      return { code: input.code, name: "team A", id: 24 };
    },
  };

  return { importTeam };
};

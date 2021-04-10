const graphql = require("graphql");
const { typeDef: teamType, inputImportTeam } = require("../../types/team");

const importTeam = {
  type: teamType,
  args: {
    input: { type: inputImportTeam },
  },
  resolve: (_, { input }) => {
    return { code: input.code, name: "team A", id: 24 };
  },
};

module.exports = { importTeam };

const Team = require("../../models/teams");

module.exports = () => {
  const create = async ({ name, shortName, tla, area, imageUrl, code }) => {
    return new Team({
      name,
      shortName,
      tla,
      area,
      imageUrl,
      code,
    }).save();
  };

  return { create };
};

const Team = require("../../models/teams");

module.exports = () => {
  const create = async ({
    name,
    shortName,
    tla,
    area,
    imageUrl,
    externalReference,
  }) => {
    return new Team({
      name,
      shortName,
      tla,
      area,
      imageUrl,
      externalReference,
    }).save();
  };

  const getById = (id) => Team.findById(id);

  const getByExternalReference = (externalReference) => {
    return Team.findOne({ externalReference });
  };

  return { create, getByExternalReference, getById };
};

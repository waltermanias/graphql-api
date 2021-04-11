const Player = require("../../models/players");

module.exports = () => {
  const create = async ({
    name,
    externalReference,
    position,
    dateOfBirth,
    countryOfBirth,
    nationality,
    team,
  }) => {
    return new Player({
      name,
      externalReference,
      position,
      dateOfBirth,
      countryOfBirth,
      nationality,
      team,
    }).save();
  };

  return { create };
};

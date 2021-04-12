const Player = require("../../models/players");

module.exports = () => {
  const upsert = ({
    name,
    externalReference,
    position,
    dateOfBirth,
    countryOfBirth,
    nationality,
    team,
  }) => {
    return Player.findOneAndUpdate(
      { externalReference },
      {
        name,
        externalReference,
        position,
        dateOfBirth,
        countryOfBirth,
        nationality,
        team,
      },
      {
        new: true,
        upsert: true,
      }
    );
  };

  const getByTeam = (teamId) => Player.find({ team: teamId });

  const deleteById = (id) => Player.findByIdAndRemove(id);

  return { upsert, getByTeam, deleteById };
};

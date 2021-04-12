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

  const getByTeam = (id) => Player.find({ team: id });

  const getByTeams = (teams) =>
    Player.find({ team: { $in: teams } }).populate("team");

  const getAll = () => Player.find({}).populate("team");

  const deleteById = (id) => Player.findByIdAndRemove(id);

  return { upsert, getByTeam, deleteById, getByTeams, getAll };
};

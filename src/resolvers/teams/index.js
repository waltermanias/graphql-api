module.exports = ({ teamsService }) => {
  const getTeams = () => teamsService.getTeams();

  return { getTeams };
};

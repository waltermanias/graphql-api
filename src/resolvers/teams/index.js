module.exports = ({ teamsService }) => {
  const getTeams = async (input) => {
    const teams = await teamsService.getTeams();
    if (input.team) {
      return teams.filter((team) =>
        team.name
          .toLowerCase()
          .startsWith(input.team.name.startsWith.toLowerCase())
      );
    }
    return teams;
  };

  return { getTeams };
};

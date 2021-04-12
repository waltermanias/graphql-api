module.exports = ({ playersService, leaguesService }) => {
  const getByTeam = (id) => playersService.getByTeam(id);
  const getPlayers = async (input) => {
    let players = [];
    if (input.league) {
      const [league] = await leaguesService.getLeagues({
        code: input.league.code,
      });

      if (!league) {
        throw new Error("The league doesn't exist.");
      }
      players = await playersService.getByTeams(league.teams);
    } else {
      players = await playersService.getAll();
    }

    if (input.name || input.team)
      return players.filter(({ name, team: { name: teamName } }) => {
        if (input.team) {
          if (
            !teamName
              .toLowerCase()
              .startsWith(input.team.name.startsWith.toLowerCase())
          ) {
            return false;
          }
        }

        if (input.name) {
          if (
            !name.toLowerCase().startsWith(input.name.startsWith.toLowerCase())
          ) {
            return false;
          }
        }
        return true;
      });

    return players;
  };
  return {
    getByTeam,
    getPlayers,
  };
};

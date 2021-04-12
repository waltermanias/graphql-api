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

    if (input.name)
      return players.filter(({ name }) =>
        name.toLowerCase().startsWith(input.name.startsWith.toLowerCase())
      );

    return players;
  };
  return {
    getByTeam,
    getPlayers,
  };
};

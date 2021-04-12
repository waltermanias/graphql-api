module.exports = ({ leaguesService, jobServices }) => {
  const getByCode = (code) => leaguesService.getByCode({ code });

  const getLeagues = () => leaguesService.getLeagues();

  return {
    getByCode,
    getLeagues,
  };
};

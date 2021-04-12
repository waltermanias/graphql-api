module.exports = ({ leaguesService }) => {
  const getByCode = (code) => leaguesService.getByCode({ code });

  const getLeagues = async () => leaguesService.getLeagues();

  return {
    getByCode,
    getLeagues,
  };
};

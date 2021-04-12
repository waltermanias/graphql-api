module.exports = ({ leaguesService }) => {
  const getByCode = (code) => leaguesService.getByCode({ code });

  const getLeagues = async ({ code }) => leaguesService.getLeagues({ code });

  return {
    getByCode,
    getLeagues,
  };
};

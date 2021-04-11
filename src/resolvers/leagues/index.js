module.exports = ({ leaguesService }) => {
  const getByCode = (code) => leaguesService.getByCode({ code });

  return {
    getByCode,
  };
};

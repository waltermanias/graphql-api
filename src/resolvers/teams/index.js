module.exports = ({ teamsService }) => {
  const getByCode = (code) => teamsService.getByCode({ code });

  return {
    getByCode,
  };
};

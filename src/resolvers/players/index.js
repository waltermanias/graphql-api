module.exports = ({ playersService }) => {
  const getByCode = (code) => playersService.getByCode({ code });
  const getByTeam = (id) => playersService.getByTeam(id);
  return {
    getByCode,
    getByTeam,
  };
};

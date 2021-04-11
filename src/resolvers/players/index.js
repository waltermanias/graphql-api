module.exports = ({ playersService }) => {
  const getByCode = (code) => playersService.getByCode({ code });

  return {
    getByCode,
  };
};

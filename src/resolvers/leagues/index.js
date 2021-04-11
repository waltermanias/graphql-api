module.exports = ({ leaguesService, jobServices }) => {
  const getByCode = (code) => leaguesService.getByCode({ code });

  const importLeague = async (code) => {
    //  TODO: We could trigger a message and delegate this task to an external process...
    // Get all teams

    const job = await jobServices.create({ leagueCode: code });

    

  };

  return {
    getByCode,
  };
};

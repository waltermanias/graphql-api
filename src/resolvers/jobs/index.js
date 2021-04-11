const { convert } = require("../../converters/jobs");

module.exports = ({ jobServices }) => {
  const importLeague = async (leagueCode) => {
    const job = await jobServices.create({ leagueCode });
    return convert(job);
  };

  const getJobs = async ({ status }) => {};

  return {
    importLeague,
    getJobs,
  };
};
  
module.exports = ({ jobsService }) => {
  const createJob = async (leagueCode) => jobsService.create({ leagueCode });

  const getJobs = async ({ status }) => {};

  return {
    createJob,
    getJobs,
  };
};

module.exports = ({ jobsService }) => {
  const createJob = async (leagueCode) => {
    const pendingJob = await jobsService.getByLeagueCode({
      leagueCode,
      status: "WAITING",
    });
    if (pendingJob) return pendingJob;
    return jobsService.create({ leagueCode });
  };

  const getJobs = async ({ status }) => {};

  return {
    createJob,
    getJobs,
  };
};

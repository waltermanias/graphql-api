module.exports = ({ jobsService, pubSubService }) => {
  const createJob = async (leagueCode) => {
    const pendingJob = await jobsService.getByLeagueCode({
      leagueCode,
      status: "WAITING",
    });
    if (pendingJob) return pendingJob;
    const job = await jobsService.create({ leagueCode });

    pubSubService.publish({ type: "JobCreated", payload: job }).catch((err) => {
      console.error(err.message);
    });

    return job;
  };

  const getJobs = async ({ status }) => {};

  return {
    createJob,
    getJobs,
  };
};

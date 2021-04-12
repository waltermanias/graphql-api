module.exports = ({ jobsService, pubSubService }) => {
  const createJob = async (leagueCode) => {
    const pendingJob = await jobsService.getByLeagueCode({
      leagueCode,
      status: "WAITING",
    });
    if (pendingJob) return pendingJob;
    const job = await jobsService.create({ leagueCode });

    const { _id, ...restJob } = job.toJSON();

    pubSubService
      .publish({
        type: "JobCreated",
        payload: { id: _id.toString(), ...restJob },
      })
      .catch((err) => {
        console.error(err.message);
      });

    return { _id, ...restJob };
  };

  const getJobs = async ({ status }) => {};

  return {
    createJob,
    getJobs,
  };
};

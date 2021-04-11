const Job = require("../../models/jobs");

module.exports = () => {
  const create = async ({ leagueCode }) => {
    return new Job({
      leagueCode,
    }).save();
  };

  const getByLeagueCode = async ({ leagueCode, status }) => {
    return Job.findOne({ leagueCode, status });
  };

  const getById = async (id) => {
    return Job.findOne({ _id: id });
  };

  return { getById, create, getByLeagueCode };
};

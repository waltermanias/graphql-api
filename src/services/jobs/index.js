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

  const update = async (id, params) => {
    return Job.updateOne({ _id: id }, params, {
      new: true,
      omitUndefined: true,
    });
  };

  return { getById, create, getByLeagueCode, update };
};

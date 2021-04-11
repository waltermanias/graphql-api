const Job = require("../../models/jobs");

module.exports = () => {
  const create = async ({ leagueCode }) => {
    return new Job({
      leagueCode,
    }).save();
  };

  const getById = async (id) => {
    return Job.findOne({ _id: id });
  };

  return { getById, create };
};

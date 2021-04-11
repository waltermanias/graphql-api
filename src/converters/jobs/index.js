module.exports = {
  convert: (job) => {
    if (!job) return undefined;
    const { _id, ...restJob } = job;
    return { id: _id.toString(), ...restJob };
  },
};

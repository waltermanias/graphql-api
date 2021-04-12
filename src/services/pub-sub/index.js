const axios = require("axios");
const config = require("config");

module.exports = () => {
  const publish = async ({ type, payload }) => {
    console.log("Published event", type, payload);
    if (type === "JobCreated") {
      // We're not to wait until this endpoint process the data
      axios.post(config.get("batchProcess.endpoint"), payload);
    }
    // TODO: Code goes here!
  };

  return { publish };
};

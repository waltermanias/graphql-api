const axios = require("axios");
const config = require("config");

module.exports = () => {
  const getByLeagueCode = async (code) => {
    try {
      const response = await axios.get(
        `${config.get(
          "footballApi.baseUrl"
        )}/competitions/${code.toUpperCase()}/teams`,
        {
          headers: {
            "X-Auth-Token": config.get("footballApi.token"),
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404 || err.response.status === 429) {
          return undefined;
        }
      }
      throw err;
    }
  };

  const getById = async (id) => {
    try {
      const response = await axios.get(
        `${config.get("footballApi.baseUrl")}/teams/${id}`,
        {
          headers: {
            "X-Auth-Token": config.get("footballApi.token"),
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404 || err.response.status === 429) {
          return undefined;
        }
      }
      throw err;
    }
  };

  return { getByLeagueCode, getById };
};

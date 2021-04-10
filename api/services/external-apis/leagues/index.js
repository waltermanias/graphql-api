const axios = require("axios");
const config = require("config");

module.exports = () => {
  const getByCode = async (code) => {
    try {
      const response = await axios.get(
        `${config.get(
          "footballApi.baseUrl"
        )}/competitions/${code.toUpperCase()}`,
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

  return { getByCode };
};

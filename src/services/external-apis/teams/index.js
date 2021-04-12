const axios = require("../../../commons/axiosApi");
const config = require("config");

module.exports = () => {
  const getByLeagueCode = async (code) => {
    const response = await axios.get(
      `${config.get(
        "footballApi.baseUrl"
      )}/competitions/${code.toUpperCase()}/teams`
    );

    return response.data;
  };

  const getById = async (id) => {
    const response = await axios.get(
      `${config.get("footballApi.baseUrl")}/teams/${id}`
    );

    return response.data;
  };

  return { getByLeagueCode, getById };
};

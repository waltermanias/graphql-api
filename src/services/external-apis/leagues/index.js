const axios = require("../../../commons/axiosApi");
const config = require("config");

module.exports = () => {
  const getByCode = async (code) => {
    const response = await axios.get(
      `${config.get("footballApi.baseUrl")}/competitions/${code.toUpperCase()}`
    );

    return response.data;
  };

  return { getByCode };
};

const axios = require("axios");
const config = require("config");
const sleep = require("util").promisify(setTimeout);

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (axiosConfig) => {
    axiosConfig.headers = {
      "X-Auth-Token": config.get("footballApi.token"),
    };
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 404) {
      return Promise.resolve({ data: undefined });
    }
    if (error.response.status === 429) {
      const result = error.response.data.message.match(/(?<retry>(\d+))/);
      await sleep((Number(result.groups.retry) + 10) * 1000);
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

module.exports = axiosApiInstance;

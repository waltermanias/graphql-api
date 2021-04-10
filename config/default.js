module.exports = {
  settings: {
    port: process.env.PORT,
  },
  footballApi: {
    token: process.env.FOOTBALL_DATA_API_TOKEN,
    baseUrl: "http://api.football-data.org/v2",
  },
};

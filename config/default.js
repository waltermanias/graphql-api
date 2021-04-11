module.exports = {
  settings: {
    port: process.env.PORT,
    databaseUri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_AUTH_DB}`,
    databaseOptions: {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },
  footballApi: {
    token: process.env.FOOTBALL_DATA_API_TOKEN,
    baseUrl: "http://api.football-data.org/v2",
  },
};

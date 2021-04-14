module.exports = {
  settings: {
    databaseUri: `mongodb://username:password@host:27017/admin`,
    databaseOptions: {
      dbName: "admin",
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },
  footballApi: {
    token: "my-test-token",
    baseUrl: "http://api.company.com/v2",
  },
};

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("./schemas");

const createApp = () => {
  const app = express();

  app.use("/graphql", graphqlHTTP({ schema: buildSchema(), graphiql: true }));

  return app;
};

module.exports = { createApp };

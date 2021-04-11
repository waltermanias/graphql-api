const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const createApp = async () => {
  const { connect } = require("./database");
  await connect();

  const app = express();

  const services = require("./services");
  const resolvers = require("./resolvers")(services);
  const schemaBuilder = require("./schemas")(resolvers);

  app.use(
    "/graphql",
    graphqlHTTP({ schema: schemaBuilder.buildSchema(), graphiql: true })
  );

  return app;
};

module.exports = { createApp };
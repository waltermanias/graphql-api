const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const createApp = async () => {
  const { connect } = require("./database");
  await connect();

  const app = express();

  const services = require("./services");
  const resolvers = require("./resolvers")(services);
  const importer = require("./importer")(services);
  const schemaBuilder = require("./schemas")(resolvers);

  app.use(express.json());

  app.use(
    "/graphql",
    graphqlHTTP({ schema: schemaBuilder.buildSchema(), graphiql: true })
  );

  app.post("/webhooks", async (req, res) => {
    await importer.processJob(req.body);
    res.status(200).json({ ok: true });
  });

  return app;
};

module.exports = { createApp };

const appFactory = require("./api/app");

const env = require("dotenv");
env.config();

const serverPort = process.env.PORT;

const app = appFactory.createApp();

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}...`);
});

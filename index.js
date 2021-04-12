const appFactory = require("./src/app");

const env = require("dotenv");
env.config();

const serverPort = process.env.PORT;

appFactory
  .createApp()    
  .then((app) => {  
    app.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}...`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

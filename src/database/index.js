const config = require("config");
const mongoose = require("mongoose");

const connect = async () => {
  try {
    const { databaseUri, databaseOptions } = config.get("settings");
    const connection = await mongoose.connect(databaseUri, databaseOptions);
    console.log("Database connected successfully...");
    return connection;
  } catch (err) {
    console.error("Error while trying to connect to database...", err.message);
    process.exit(1);
  }
};

module.exports = {
  connect,
};

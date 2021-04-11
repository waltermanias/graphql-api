const League = require("../../models/competitions");

module.exports = () => {
  const getByCode = async (code) => {
    // This code goes to the database

    const myLeague = await League.findOne().lean();
    return myLeague;
  };

  return { getByCode };
};

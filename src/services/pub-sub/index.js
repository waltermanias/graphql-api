module.exports = () => {
  const publish = async ({ type, payload }) => {
    // TODO: Code goes here!
    console.log("Published event", type, payload);
  };

  return { publish };
};

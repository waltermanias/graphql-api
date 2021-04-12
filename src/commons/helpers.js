const splitArray = (items, chunkSize) =>
  items.reduce((acc, cur, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

module.exports = {
  splitArray,
};

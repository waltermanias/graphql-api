const mongoose = require("mongoose");
const converter = require(".");

describe("job converter", () => {
  describe("when the job is not undefined", () => {
    let result;
    beforeEach(() => {
      result = converter.convert({
        _id: mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      });
    });
    test("should return the converted object", () => {
      expect(result).toEqual({
        id: "53c934bbf299ab241a6e0524",
        status: "READY",
      });
    });
  });

  describe("when the job is undefined", () => {
    let result;
    beforeEach(() => {
      result = converter.convert(undefined);
    });
    test("should return the converted object", () => {
      expect(result).toBeUndefined();
    });
  });
});

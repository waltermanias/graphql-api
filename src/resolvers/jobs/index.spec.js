const mongoose = require("mongoose");

const converter = require("../../converters/jobs");
const Resolver = require(".");

jest.mock("../../converters/jobs", () => ({
  convert: jest.fn().mockReturnValue({ id: "test-converted" }),
}));

describe("job resolver", () => {
  let resolver;
  let jobServices;

  beforeAll(() => {
    jobServices = {
      create: jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      }),
    };

    resolver = Resolver({ jobServices });
  });

  describe("importLeague method", () => {
    let result;
    beforeAll(async () => {
      result = await resolver.importLeague("league-code");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call create method with params", () => {
      expect(jobServices.create).toHaveBeenCalledWith({
        leagueCode: "league-code",
      });
    });
    test("should call convert method with params", () => {
      expect(converter.convert).toHaveBeenCalledWith({
        _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      });
    });
    test("should return the converted data", () => {
      expect(result).toEqual({ id: "test-converted" });
    });
  });
});

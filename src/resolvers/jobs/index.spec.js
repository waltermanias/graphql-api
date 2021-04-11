const mongoose = require("mongoose");

const Resolver = require(".");

describe("job resolver", () => {
  let resolver;
  let jobsService;

  beforeAll(() => {
    jobsService = {
      create: jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      }),
    };

    resolver = Resolver({ jobsService });
  });

  describe("createJob method", () => {
    let result;
    beforeAll(async () => {
      result = await resolver.createJob("league-code");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call create method with params", () => {
      expect(jobsService.create).toHaveBeenCalledWith({
        leagueCode: "league-code",
      });
    });

    test("should return the converted data", () => {
      expect(result).toEqual({
        _id: mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      });
    });
  });
});

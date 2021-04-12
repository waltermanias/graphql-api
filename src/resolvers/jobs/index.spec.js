const mongoose = require("mongoose");
const Resolver = require(".");

describe("job resolver", () => {
  let resolver;
  let jobsService;

  beforeAll(() => {
    jobsService = {
      getByLeagueCode: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
        status: "READY",
      }),
    };

    pubSubService = {
      publish: jest.fn().mockResolvedValue({}),
    };

    resolver = Resolver({ jobsService, pubSubService });
  });

  describe("createJob method", () => {
    describe("when there is a waiting job", () => {
      let result;
      beforeAll(async () => {
        jobsService.getByLeagueCode.mockResolvedValueOnce({
          _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
          status: "WAITING",
        });

        result = await resolver.createJob("league-code");
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      test("should return the existing job", () => {
        expect(result).toEqual({
          _id: mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
          status: "WAITING",
        });
      });
    });

    describe("when there is not a waiting job", () => {
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

      test("should return the data", () => {
        expect(result).toEqual({
          _id: mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
          status: "READY",
        });
      });

      test("should call publish method", () => {
        expect(pubSubService.publish).toHaveBeenCalledWith({
          payload: {
            _id: new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524"),
            status: "READY",
          },
          type: "JobCreated",
        });
      });
    });
  });
});

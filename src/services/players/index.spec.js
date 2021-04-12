const Service = require(".");
const Model = require("../../models/players");

jest.mock("../../models/players");

describe("players service", () => {
  let service;

  beforeAll(() => {
    service = Service();
  });

  describe("upsert method", () => {
    let result;
    let spySave;

    beforeAll(async () => {
      const data = {
        name: "Dani Ceballos",
        externalReference: 343,
        position: "Midfielder",
        dateOfBirth: new Date("1996-08-07T00:00:00Z"),
        countryOfBirth: "Spain",
        nationality: "Spain",
        team: "53c934bbf299ab241a6e0524",
      };

      Model.findOneAndUpdate.mockResolvedValue({ id: "test-returned" });

      result = await service.upsert(data);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call upsert method with params", () => {
      expect(Model.findOneAndUpdate).toHaveBeenCalledWith(
        {
          externalReference: 343,
        },
        {
          countryOfBirth: "Spain",
          dateOfBirth: new Date("1996-08-07T00:00:00.000Z"),
          externalReference: 343,
          name: "Dani Ceballos",
          nationality: "Spain",
          position: "Midfielder",
          team: "53c934bbf299ab241a6e0524",
        },
        { new: true, upsert: true }
      );
    });
    test("should return the team", () => {
      expect(result).toEqual({ id: "test-returned" });
    });
  });

  describe("getByTeam", () => {
    beforeAll(async () => {
      await service.getByTeam("12345");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call find method with params", () => {
      expect(Model.find).toHaveBeenCalledWith({
        team: "12345",
      });
    });
  });

  describe("deleteById", () => {
    beforeAll(async () => {
      await service.deleteById("12345");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call findByIdAndRemove with params", () => {
      expect(Model.findByIdAndRemove).toHaveBeenCalledWith("12345");
    });
  });
});

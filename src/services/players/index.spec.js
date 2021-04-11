const Service = require(".");
const Model = require("../../models/players");

jest.mock("../../models/players");

describe("players service", () => {
  let service;

  beforeAll(() => {
    service = Service();
  });

  describe("create method", () => {
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

      spySave = jest.spyOn(Model.prototype, "save");
      spySave.mockResolvedValue({ id: "test-returned" });

      result = await service.create(data);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call the constructor with params", () => {
      expect(Model).toHaveBeenCalledWith({
        countryOfBirth: "Spain",
        dateOfBirth: new Date("1996-08-07T00:00:00.000Z"),
        externalReference: 343,
        name: "Dani Ceballos",
        nationality: "Spain",
        position: "Midfielder",
        team: "53c934bbf299ab241a6e0524",
      });
    });
    test("should call the save method", () => {
      expect(spySave).toHaveBeenCalled();
    });
    test("should return the team", () => {
      expect(result).toEqual({ id: "test-returned" });
    });
  });
});

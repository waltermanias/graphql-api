const Service = require(".");
const Model = require("../../models/jobs");

jest.mock("../../models/jobs");

describe("jobs service", () => {
  let service;

  beforeAll(() => {
    service = Service();
  });

  describe("create method", () => {
    let result;
    let spySave;

    beforeAll(async () => {
      const data = {
        leagueCode: "league-a",
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
        leagueCode: "league-a",
      });
    });
    test("should call the save method", () => {
      expect(spySave).toHaveBeenCalled();
    });
    test("should return the league", () => {
      expect(result).toEqual({ id: "test-returned" });
    });
  });

  describe("update method", () => {
    let spyUpdateOne;

    beforeAll(async () => {
      spyUpdateOne = jest.spyOn(Model, "updateOne");

      await service.update("test-id", { status: "some-status" });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call updateOne method with params", () => {
      expect(spyUpdateOne).toHaveBeenCalledWith(
        {
          _id: "test-id",
        },
        { status: "some-status" },
        { new: true, omitUndefined: true }
      );
    });
  });
});

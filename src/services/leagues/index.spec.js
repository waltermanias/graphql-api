const mongoose = require("mongoose");
const Service = require(".");
const Model = require("../../models/competitions");

jest.mock("../../models/competitions");

describe("leagues service", () => {
  let service;

  beforeAll(() => {
    service = Service();
  });

  describe("createLeague method", () => {
    let result;
    let spySave;

    beforeAll(async () => {
      const data = {
        name: "league-a",
        area: "area-a",
        code: "league-code",
        teams: ["53c934bbf299ab241a6e0524"],
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
        area: "area-a",
        code: "league-code",
        name: "league-a",
        teams: [new mongoose.Types.ObjectId("53c934bbf299ab241a6e0524")],
      });
    });
    test("should call the save method", () => {
      expect(spySave).toHaveBeenCalled();
    });
    test("should return the league", () => {
      expect(result).toEqual({ id: "test-returned" });
    });
  });
});

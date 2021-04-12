const mongoose = require("mongoose");

const Service = require(".");
const Model = require("../../models/leagues");

jest.mock("../../models/leagues");

describe("leagues service", () => {
  let service;
  const populate = jest.fn();

  beforeAll(() => {
    service = Service();
  });

  describe("create method", () => {
    let result;
    let spySave;

    beforeAll(async () => {
      const data = {
        name: "league-a",
        area: "area-a",
        code: "league-code",
        externalReference: "league-id",
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
        externalReference: "league-id",
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

  describe("getByCode method", () => {
    let spyFindOne;

    beforeAll(async () => {
      spySave = jest.spyOn(Model.prototype, "save");
      spyFindOne = jest.spyOn(Model, "findOne");
      spyFindOne.mockReturnValue({
        populate,
      });
      await service.getByCode("league-123");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call findOne method with params", () => {
      expect(spyFindOne).toHaveBeenCalledWith({ code: "league-123" });
    });
    test("should call populate method with params", () => {
      expect(populate).toHaveBeenCalledWith("teams");
    });
  });
  describe("getLeagues method", () => {
    beforeAll(async () => {
      Model.find.mockReturnValue({
        populate,
      });
      await service.getLeagues({ code: "PL" });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should call findOne method with params", () => {
      expect(Model.find).toHaveBeenCalledWith({ code: "PL" });
    });

    test("should call populate method with params", () => {
      expect(populate).toHaveBeenCalledWith("teams");
    });
  });
});

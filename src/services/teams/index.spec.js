const Service = require(".");
const Model = require("../../models/teams");

jest.mock("../../models/teams");

describe("teams service", () => {
  let service;

  beforeAll(() => {
    service = Service();
  });

  describe("create method", () => {
    let result;
    let spySave;

    beforeAll(async () => {
      const data = {
        name: "team-name",
        shortName: "team-shortname",
        tla: "team-tla",
        area: "team-area",
        imageUrl: "team-imageurl",
        externalReference: "team-external-reference",
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
        area: "team-area",
        imageUrl: "team-imageurl",
        name: "team-name",
        shortName: "team-shortname",
        tla: "team-tla",
        externalReference: "team-external-reference",
      });
    });
    test("should call the save method", () => {
      expect(spySave).toHaveBeenCalled();
    });
    test("should return the team", () => {
      expect(result).toEqual({ id: "test-returned" });
    });
  });

  describe("getByExternalReference method", () => {
    beforeAll(async () => {
      result = await service.getByExternalReference("123");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("shold call findOne method with params", () => {
      expect(Model.findOne).toHaveBeenCalledWith({ externalReference: "123" });
    });
  });

  describe("getById method", () => {
    beforeAll(async () => {
      result = await service.getById("123");
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("shold call findOne method with params", () => {
      expect(Model.findById).toHaveBeenCalledWith("123");
    });
  });

  describe("getTeams method", () => {
    beforeAll(async () => {
      result = await service.getTeams();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("shold call find method with params", () => {
      expect(Model.find).toHaveBeenCalledWith({});
    });
  });
});

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
        code: "team-code",
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
        code: "team-code",
        imageUrl: "team-imageurl",
        name: "team-name",
        shortName: "team-shortname",
        tla: "team-tla",
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

const axios = require("../../../commons/axiosApi");
const Service = require(".");

jest.mock("../../../commons/axiosApi");

describe("api - team services", () => {
  let service;
  const code = "ABCD";
  beforeAll(() => {
    service = Service();
  });
  describe("getByLeagueCode method", () => {
    describe("when the league doesn't exist", () => {
      let result;
      beforeAll(() => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({ data: undefined })
        );
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getByLeagueCode(code);
      });

      test("should return an undefined object", () => {
        expect(result).toBeUndefined();
      });
    });

    describe("when the league exists", () => {
      let result;
      const data = { id: 1, name: "test-league" };

      beforeAll(() => {
        axios.get.mockResolvedValue({ data });
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getByLeagueCode(code);
      });

      test("should return the league's teams", () => {
        expect(result).toEqual(data);
      });

      test("axios should be called with params", () => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://api.company.com/v2/competitions/${code}/teams`
        );
      });
    });
  });

  describe("getById method", () => {
    describe("when the team doesn't exist", () => {
      let result;
      beforeAll(() => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({ data: undefined })
        );
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getById(1234);
      });

      test("should return an undefined object", () => {
        expect(result).toBeUndefined();
      });
    });

    describe("when the team exists", () => {
      let result;
      const data = { id: 1, name: "test-team" };

      beforeAll(() => {
        axios.get.mockResolvedValue({ data });
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getById(1234);
      });

      test("should return the team", () => {
        expect(result).toEqual(data);
      });

      test("get method should be called with params", () => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://api.company.com/v2/teams/${1234}`
        );
      });
    });
  });
});

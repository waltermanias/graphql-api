const axios = require("../../../commons/axiosApi");
const Service = require(".");

jest.mock("../../../commons/axiosApi");

describe("api - league services", () => {
  let service;
  const code = "PL";
  beforeAll(() => {
    service = Service();
  });
  describe("getByCode method", () => {
    describe("when the league doesn't exist", () => {
      let result;
      beforeAll(() => {
        axios.get.mockResolvedValueOnce({ data: undefined });
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getByCode(code);
      });

      test("should return an undefined object", async () => {
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
        result = await service.getByCode(code);
      });

      test("should return the league", () => {
        expect(result).toEqual(data);
      });

      test("axios should be called with params", () => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://api.company.com/v2/competitions/${code}`
        );
      });
    });
  });
});

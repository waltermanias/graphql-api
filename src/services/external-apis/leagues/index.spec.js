const axios = require("axios");
const Service = require(".");

jest.mock("axios");

describe("api - league services", () => {
  let service;
  const code = "ABCD";
  beforeAll(() => {
    service = Service();
  });
  describe("getByCode method", () => {
    describe("when the league doesn't exist", () => {
      let result;
      beforeAll(() => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({ response: { status: 404 } })
        );
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getByCode(code);
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
        result = await service.getByCode(code);
      });

      test("should return the league", () => {
        expect(result).toEqual(data);
      });

      test("axios should be called with params", () => {
        expect(axios.get).toHaveBeenCalledWith(
          `http://api.company.com/v2/competitions/${code}`,
          {
            headers: { "X-Auth-Token": "my-test-token" },
          }
        );
      });
    });

    describe("when there are too many requests", () => {
      let result;
      beforeAll(() => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({ response: { status: 429 } })
        );
      });

      beforeAll(() => {
        jest.clearAllMocks();
      });

      beforeEach(async () => {
        result = await service.getByCode(code);
      });

      test("should return an undefined object", () => {
        expect(result).toBeUndefined();
      });
    });
  });
});

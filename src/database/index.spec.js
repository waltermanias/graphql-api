const mongoose = require("mongoose");

const connection = require(".");

jest.mock("mongoose");

describe("database connection", () => {
  beforeAll(() => {
    mongoose.connect = jest.fn().mockResolvedValue({ status: "connected" });
  });

  describe("when the connection is successful", () => {
    let result;
    beforeAll(async () => {
      result = await connection.connect();
    });
    test("should return the connection", () => {
      expect(result).toEqual({ status: "connected" });
    });

    test("should call connect with params", () => {
      expect(mongoose.connect).toHaveBeenCalledWith(
        "mongodb://username:password@host:27017/admin",
        {
          dbName: "admin",
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    });
  });

  describe("when something went wrong in the connection", () => {
    const realProcess = process;
    const exitMock = jest.fn();
    beforeAll(async () => {
      global.process = { ...realProcess, exit: exitMock };
      mongoose.connect = jest.fn().mockRejectedValue("Some error");
      await connection.connect();
    });

    afterAll(() => {
      global.process = realProcess;
    });

    test("should call process.exit with params", () => {
      expect(exitMock).toHaveBeenCalledWith(1);
    });
  });
});

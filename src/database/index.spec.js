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
    let spyError;
    let spyLog;
    let result;
    beforeAll(async () => {
      global.process = { ...realProcess, exit: exitMock };
      spyError = jest.spyOn(console, "error").mockImplementation(() => {});
      spyLog = jest.spyOn(console, "log").mockImplementation(() => {});
      mongoose.connect = jest.fn().mockRejectedValue({ message: "Some error" });
      result = await connection.connect();
    });

    afterAll(() => {
      global.process = realProcess;
      console.log.mockRestore();
      console.error.mockRestore();
    });

    test("should throw an error ", async () => {
      expect(result).toBeUndefined();
    });

    test("should call process.exit with params", () => {
      expect(exitMock).toHaveBeenCalledWith(1);
    });
  });
});

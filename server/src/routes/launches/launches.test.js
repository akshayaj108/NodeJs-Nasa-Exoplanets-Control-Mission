const request = require("supertest");
const app = require("../../app");
const {
  mongoConnect,
  mongoDisconnect,
} = require("../../services/mongoService");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  //get all launches
  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  //post launch
  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "AJ-3",
      rocket: "AJ Craft Starship",
      target: "Kepler-62 f",
      launchDate: "July 1, 2028",
    };
    const launchDataWithoutDate = {
      mission: "AJ-3",
      rocket: "AJ Craft Starship",
      target: "Kepler-62 f",
    };
    const completeLaunchDataWithInvalidDate = {
      mission: "AJ-3",
      rocket: "AJ Craft Starship",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };
    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Invalid Date" });
    });
  });

  // testing delete api
  // describe("Test DELETE /launch", () => {
  //   test("It should respond with 200 success", async () => {
  //     const response = await request(app)
  //       .delete("/launches")

  //       .expect("Content-Type", /json/)
  //       .expect(200);
  //   });
  // });
});

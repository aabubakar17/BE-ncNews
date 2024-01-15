const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("/api", () => {
    describe("GET /topics", () => {
      test("status code of 200", () => {
        return request(app).get("/api/topics").expect(200);
      });
      test("reposne with an array of topics objects", () => {
        return request(app)
          .get("/api/topics")
          .then(({ body }) => {
            const { topics } = body;
            expect(Array.isArray(topics)).toEqual(true);
            topics.forEach((topic) => {
              expect(typeof topic.slug).toBe("string");
              expect(typeof topic.description).toBe("string");
            });
          });
      });
      test("GET: 404 responds with an appropiate status when provided with a bad route(route not available)", () => {
        return request(app).get("/api/animals").expect(404);
      });
    });
  });
});

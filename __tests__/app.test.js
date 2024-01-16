const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app");
const endpoints = require("../endpoints.json");

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
            expect(topics.length).toEqual(3);
            topics.forEach((topic) => {
              expect(typeof topic.slug).toBe("string");
              expect(typeof topic.description).toBe("string");
            });
          });
      });
      test("GET: 404 responds with an appropiate status when provided with a bad route(route not available)", () => {
        return request(app)
          .get("/api/animals")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("route not found");
          });
      });
    });
    test("GET: 200 reponds with an appropiate status code and a object of all the available endpoints of the api", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { resEndpoints } = body;
          expect(resEndpoints).toEqual(endpoints);
        });
    });
  });
  describe("GET /articles", () => {
    describe("Get /articles/:article_id", () => {
      test("GET : 200 responds with a single article based on id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            const { article } = body;
            expect(article.article_id).toBe(1);
            expect(article.title).toBe("Living in the shadow of a great man");
            expect(article.topic).toBe("mitch");
            expect(article.author).toBe("butter_bridge");
            expect(article.body).toBe("I find this existence challenging");
            expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
            expect(article.votes).toBe(100);
            expect(article.article_img_url).toBe(
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            );
          });
      });
      test("GET 404 send an appropiate status and error message when given a valid but non-existent id", () => {
        return request(app)
          .get("/api/articles/9999")
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("article does not exist");
          });
      });
      test("GET 400 send an appropiate status and error message when given an invalid id", () => {
        return request(app)
          .get("/api/articles/not-a-article")
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
      describe("GET: /comments", () => {
        test.only("GET: 200 sends an appropiate status and array of comments for the given article_id", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              const { comments } = body;
              comments.forEach((comment) => {
                expect(typeof comment.comment_id).toBe("number");
                expect(typeof comment.votes).toBe("number");
                expect(typeof comment.created_at).toBe("string");
                expect(typeof comment.author).toBe("string");
                expect(typeof comment.body).toBe("string");
                expect(typeof comment.article_id).toBe("number");
              });
            });
        });

        test.only("GET: 200 sends an appropiate status and array of comments for the given article_id with no comments", () => {
          return request(app)
            .get("/api/articles/10/comments")
            .expect(200)
            .then(({ body }) => {
              const { comments } = body;
              expect(comments).toEqual([]);
            });
        });

        test.only("GET 404 send an appropiate status and error message when given a valid but non-existent id", () => {
          return request(app)
            .get("/api/articles/1000/comments")
            .expect(404)
            .then(({ body }) => {
              const { msg } = body;
              expect(msg).toBe("article does not exist");
            });
        });
      });
    });
    describe("/articles ", () => {
      test("GET: 200 /articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;
            expect(Array.isArray(articles)).toEqual(true);
            expect(articles.length).toEqual(13);
            articles.forEach((article) => {
              expect(typeof article.article_id).toBe("number");
              expect(typeof article.author).toBe("string");
              expect(typeof article.title).toBe("string");
              expect(typeof article.topic).toBe("string");
              expect(typeof article.created_at).toBe("string");
              expect(typeof article.votes).toBe("number");
              expect(typeof article.article_img_url).toBe("string");
              expect(typeof article.comment_count).toBe("string");
            });
          });
      });
      test("GET: 404 responds with an appropiate status when provided with a bad route(route not available)", () => {
        return request(app)
          .get("/api/animals")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("route not found");
          });
      });
    });
  });
});

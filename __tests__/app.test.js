const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("/api", () => {
  test("GET 200 - responds with endpoint containing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/topics", () => {
  test("GET 200 - responds with endpoint containing an array of all topic objects", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
  test("GET 404 - responds with 404-not found with invalid endpoint", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
});

describe("/api/topics/articles/:article_id", () => {
  test("GET:200 - sends a single article to the client", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(3);
        expect(body.article.title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
        expect(body.article.topic).toBe("mitch");
        expect(body.article.author).toBe("icellusedkars");
        expect(body.article.body).toBe("some gifs");
        expect(body.article.created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(body.article.votes).toBe(0);
        expect(body.article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("GET:400 - sends 400 status and error message when given invalid id", () => {
    return request(app)
      .get("/api/articles/not_an_id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET:404 - sends 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});

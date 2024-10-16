const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
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
  test("GET:200 - responds with a single article to the client", () => {
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
  test("GET:400 - responds with 400 status and error message when given invalid id", () => {
    return request(app)
      .get("/api/articles/not_an_id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET:404 - responds with 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});
describe("/api/articles", () => {
  test("GET 200 - responds with endpoint containing an array of all article objects in descending order by date", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.articles).toHaveLength(13);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
  test("GET 404 - responds with 'Page not found' with invalid endpoint", () => {
    return request(app)
      .get("/api/article")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("POST 201 - adds a comment to the stated article_id with a username and body key", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "lurker", body: "What a great article" })
      .expect(201)
      .then(({ body }) => {
        console.log(body.comment);
        expect(body.comment).toMatchObject({
          author: "lurker",
          body: "What a great article",
          article_id: 2,
          votes: 0,
          comment_id: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  test("POST 400 - reponds with Bad request when passed invalid article_id", () => {
    return request(app)
      .post("/api/articles/not_an_id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST 404 - responds with 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
  xtest("POST 400 - responds with Bad request when passed an object with missing properties", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ body: "What a great article" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  xtest("POST 400 - responds with Bad request when object inserted has the wrong datatype", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "Lindsay", body: "What a great article" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Username not valid");
      });
  });
});
describe("/api/articles/:article_id", () => {
  test("PATCH 201 - adds a vote to the selected article by article_id", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ inc_votes: 1 })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          article_id: 3,
          votes: 1,
          created_at: "2020-11-03T09:12:00.000Z",
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("PATCH 400 - reponds with Bad request when passed invalid article_id", () => {
    return request(app)
      .patch("/api/articles/not_an_id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("PATCH 404 - responds with 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .patch("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});

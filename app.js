const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  postCommentsByArticle
} = require("./controllers/articles.controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.post("/api/articles/:article_id/comments", postCommentsByArticle)

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

app.use((err, request, response, next) => {
  if (err.code === "23502") {
    response.status(404).send({ msg: "Article does not exist" });
  }
  next(err);
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use("*", (request, response, next) => {
  response.status(404).send({ msg: "Page not found" });
});
module.exports = app;

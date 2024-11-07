const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  postCommentsByArticle,
  patchNewVote,
  getCommentsByArticleId,
} = require("./controllers/articles.controller");
const { deleteCommentById } = require("./controllers/comments.controller");
const { getUsers } = require("./controllers/users.controller");
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postCommentsByArticle);

app.patch("/api/articles/:article_id", patchNewVote);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use((err, request, response, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "23503") {
    response.status(400).send({ msg: "Bad request" });
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

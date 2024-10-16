const {
  fetchArticles,
  fetchArticleById,
  insertComment,
} = require("../models/articles.model");

function getArticles(request, response, next) {
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function postCommentsByArticle(request, response, next) {
  const { username, body } = request.body;
  const { article_id } = request.params;
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticles, getArticleById, postCommentsByArticle };

const {
  fetchCommentsByArticleId,
  fetchArticles,
  fetchArticleById,
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

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then(() => {
      return fetchCommentsByArticleId(article_id);
    })
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCommentsByArticleId, getArticles, getArticleById };

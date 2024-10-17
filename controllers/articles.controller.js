const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
  updateVotes,
} = require("../models/articles.model");

function getArticles(request, response, next) {
  const query = request.query
  fetchArticles(query)
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

function postCommentsByArticle(request, response, next) {
  const { username, body } = request.body;
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then(() => {
      return insertComment(article_id, username, body);
    })
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

function patchNewVote(request, response, next) {
  const { inc_vote } = request.body;
  const vote = Number(Object.values(request.body) )
  const { article_id } = request.params;
  updateVotes(article_id, inc_vote, vote)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}


module.exports = {
  getArticles,
  getArticleById,
  postCommentsByArticle,
  getCommentsByArticleId,
  patchNewVote
};

const db = require("../db/connection");
const fs = require("fs/promises");

const fetchArticles = () => {
  return db
    .query(
      "SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles, article_img_url, COUNT(comments.article_id) AS comment_count  FROM articles  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      next(err);
    });
};

const fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM ARTICLES WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return rows[0];
    });
};

module.exports = { fetchArticles, fetchArticleById };

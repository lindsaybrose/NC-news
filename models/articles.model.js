const db = require("../db/connection");
const fs = require("fs/promises");

const fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM ARTICLES WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return rows;
    });
};

module.exports = { fetchArticleById };

const { normalizeQueryConfig } = require("pg/lib/utils");
const db = require("../db/connection");
const fs = require("fs/promises");

// const fetchArticles = (query = { sort_by: "created_at", order: "DESC" }) => {
//   let queryStr =
//     "SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count  FROM articles  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id";
//   const validSortBys = ["article_id","article_author","title","topic","created_at","votes"];
//   let queryValues = [];
//   let queryValuesOrder = [];
//   if (query.topic) {
//     queryValues.push(query.topic)
//     queryStr += ` WHERE topic = ${query.topic};`
//     console.log(queryStr)
//   }

//   if (!validSortBys.includes(query.sort_by)) {
//     return Promise.reject({ status: 400, msg: "Bad request" });
//   }

//   if (query.sort_by) {
//     queryValues.push(query.sort_by);
//     queryStr += ` ORDER BY ${queryValues}`;
//   }
//   if (query.order || !query.order) {
//     if (query.order === undefined) {
//       queryValuesOrder.push("DESC");
//       queryStr += ` ${queryValuesOrder}`;
//     } else {
//       queryValuesOrder.push(query.order.toUpperCase());
//       queryStr += ` ${queryValuesOrder}`;
//     }
//   }
//   return db
//     .query(`${queryStr}`)
//     .then(({ rows }) => {
//       return rows;
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return rows[0];
    });
};
const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const insertComment = (article_id, username, body) => {
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES($1, $2, $3) RETURNING *",
      [article_id, username, body]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return rows[0];
    });
};

const updateVotes = (article_id, inc_vote, vote) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [vote, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return rows[0];
    });
};

// const fetchArticles = (query = { sort_by: "created_at", order: "DESC" }) => {
//   let queryStr =
//     "SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count  FROM articles  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id";
//   const validSortBys = ["article_id","article_author","title","topic","created_at","votes"];
//   let queryValues = [];
//   let queryValuesOrder = [];
//   if (query.topic) {
//     queryValues.push(query.topic)
//     queryStr += ` WHERE topic = '${query.topic}' GROUP BY articles.article_id;`
//   }

//   if (!validSortBys.includes(query.sort_by)) {
//     return Promise.reject({ status: 400, msg: "Bad request" });
//   }
//   console.log(queryStr)
//   if (query.sort_by) {
//     queryValues.push(query.sort_by);
//     queryStr += ` GROUP BY articles.article_id ORDER BY ${queryValues}`;
//   }
//   if (query.order || !query.order) {
//     if (query.order === undefined) {
//       queryValuesOrder.push("DESC");
//       queryStr += ` ${queryValuesOrder}`;
//     } else {
//       queryValuesOrder.push(query.order.toUpperCase());
//       queryStr += ` ${queryValuesOrder}`;
//     }
//   }
//   return db
//     .query(`${queryStr};`)
//     .then(({ rows }) => {
//       console.log(rows)
//       return rows;
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const fetchArticles = (sort_by = "created_at", order = "DESC", topic) => {
  const allowedInputs = [
    "article_id",
    "article_author",
    "title",
    "topic",
    "created_at",
    "votes",
  ];
  const allowedOrder = [
    "asc",
    "desc",
    "ASC",
    "DESC"
  ]
  if (!allowedInputs.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (!allowedOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  let queryStr =
    "SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count  FROM articles  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id";

  let queryValues = [];
  let queryValuesOrder = [];
  queryStr += ` GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order}`;

  console.log(queryStr);
  return db
    .query(`${queryStr}`)
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  fetchArticles,
  fetchCommentsByArticleId,
  fetchArticleById,
  insertComment,
  updateVotes,
};

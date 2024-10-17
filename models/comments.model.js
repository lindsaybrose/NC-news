const { normalizeQueryConfig } = require("pg/lib/utils");
const db = require("../db/connection");
const fs = require("fs/promises");

// const fetchComment = () => {
//   return db
//     .query(
//       "SELECT * FROM comments WHERE comment_id = $1", [comment_id]
//     )
//     .then(({ rows }) => {
//       return rows;
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const removeComment= (comment_id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [comment_id])
  .then (({rows}) => {
    if (rows.length === 0) {return Promise.reject({ status: 404, msg: "Comment does not exist" });}
    return rows
  })
}

module.exports = {
  removeComment
};
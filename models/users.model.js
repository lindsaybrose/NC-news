const { normalizeQueryConfig } = require("pg/lib/utils");
const db = require("../db/connection");
const fs = require("fs/promises");

const fetchUsers = () => {
  return db
    .query(
      "SELECT * FROM users"
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {fetchUsers}
const { commentData, articleData } = require("../db/data/test-data");
const { removeComment} = require("../models/comments.model");

function deleteCommentById(request, response, next) {
  const { comment_id } = request.params;
  removeComment(comment_id)
    .then((comment) => {
      response.status(204).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  deleteCommentById
};

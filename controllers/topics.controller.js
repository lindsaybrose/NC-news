const { fetchTopics } = require("../models/topics.model");

function getTopics(request, response, next) {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getTopics };

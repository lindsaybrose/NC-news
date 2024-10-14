const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controller");

app.use(express.json());

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "page not found" });
});

app.use((error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send(error.message);
  }
});

module.exports = app;

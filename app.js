const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require("./Controller/app.controller");

const {
  articleNotFoundError,
  invalidArticleError,
} = require("./Controller/errors.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.use(articleNotFoundError);
app.use(invalidArticleError);

app.use((req, res) => {
  res.status(404).send({ msg: "route not found" });
});

module.exports = app;

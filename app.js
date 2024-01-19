const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentsByArticleId,
  patchArticleById,
  deleteCommentbyId,
  getUsers,
} = require("./Controller/app.controller");

const {
  articleNotFoundError,
  invalidError,
  invalidRequestBodyError,
  NoRequestBodyError,
  commentNotFoundError,
  NotTopicError,
  invalidSortError,
  invalidOrderError,
} = require("./Controller/errors.controllers");

const apiRouter = require("./routes/api-router");
app.use(express.json());

app.use("/api", apiRouter);

app.use(articleNotFoundError);
app.use(commentNotFoundError);
app.use(invalidError);
app.use(invalidRequestBodyError);
app.use(NoRequestBodyError);
app.use(NotTopicError);
app.use(invalidSortError);
app.use(invalidOrderError);

app.use((req, res) => {
  res.status(404).send({ msg: "route not found" });
});

module.exports = app;

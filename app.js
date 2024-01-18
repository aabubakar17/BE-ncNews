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
} = require("./Controller/errors.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentbyId);

app.get("/api/users", getUsers);

app.use(articleNotFoundError);
app.use(commentNotFoundError);
app.use(invalidError);
app.use(invalidRequestBodyError);
app.use(NoRequestBodyError);

app.use((req, res) => {
  res.status(404).send({ msg: "route not found" });
});

module.exports = app;

const { getTopics, getEndpoints } = require("../Controller/app.controller");

const apiRouter = require("express").Router();
const articlesRouter = require("./articles-router");
const userRouter = require("./user-router");
const commentsRouter = require("./comments-router");

apiRouter.get("/", getEndpoints);

apiRouter.get("/topics", getTopics);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

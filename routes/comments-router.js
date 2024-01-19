const commentsRouter = require("express").Router();
const { deleteCommentbyId } = require("../Controller/app.controller");

commentsRouter.delete("/:comment_id", deleteCommentbyId);

module.exports = commentsRouter;

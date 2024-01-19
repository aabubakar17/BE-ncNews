const userRouter = require("express").Router();
const { getUsers } = require("../Controller/app.controller");

userRouter.get("/", getUsers);

module.exports = userRouter;

const express = require("express");
const { getTopics, getEndpoints } = require("./Controller/app.controller");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use((req, res, next) => {
  res.status(404).send({ msg: "route not found" });
  next();
});

module.exports = app;

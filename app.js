const express = require("express");
const { getTopics } = require("./Controller/app.controller");
const app = express();

app.get("/api/topics", getTopics);

module.exports = app;

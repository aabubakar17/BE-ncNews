const express = require("express");
const { getTopics, getEndpoints } = require("./Controller/app.controller");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

module.exports = app;

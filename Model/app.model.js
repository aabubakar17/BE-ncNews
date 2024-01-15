const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.fetchEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
    return JSON.parse(data);
  });
};

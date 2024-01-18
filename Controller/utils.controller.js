db = require("../db/connection");
exports.checkArticleExist = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
    });
};

exports.checkNewVote = (newVote) => {
  if (typeof newVote !== "number") {
    return Promise.reject({ msg: "Incorrect Type" });
  }
};

exports.checkTopicExist = (topic) => {
  return db
    .query("SELECT * FROM topics WHERE slug = $1", [topic])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Topic Not Found" });
      }
    });
};

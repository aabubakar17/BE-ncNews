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

exports.checkSortQuery = (sort_by) => {
  if (!["title", "comment_count", "created_at"].includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }
};
exports.checkOrderQuery = (order) => {
  if (!["ASC", "DESC"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }
};

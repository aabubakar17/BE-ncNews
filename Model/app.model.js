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

exports.findArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      } else {
        return rows[0];
      }
    });
};

exports.fetchArticles = (req, res) => {
  return db
    .query(
      "SELECT articles.article_id, articles.topic, articles.title, articles.created_at, articles.author, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM comments RIGHT JOIN articles ON comments.article_id = articles.article_id GROUP BY articles.article_id, articles.topic, articles.title, articles.created_at, articles.author, articles.votes, articles.article_img_url ORDER BY articles.created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.findCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertComment = (article_id, newComment) => {
  ///const created_at = new Date();

  return db
    .query(
      "INSERT INTO comments (body, votes, author, article_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [newComment.body, 0, newComment.username, article_id, new Date()]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

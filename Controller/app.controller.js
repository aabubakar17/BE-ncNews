const {
  fetchTopics,
  fetchEndpoints,
  findArticleById,
  fetchArticles,
  findCommentsByArticleId,
  insertComment,
} = require("../Model/app.model");
const { checkArticleExist } = require("./utils.controller");

exports.getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getEndpoints = (req, res) => {
  fetchEndpoints().then((resEndpoints) => {
    res.status(200).send({ resEndpoints });
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  findArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const findCommentsQuery = findCommentsByArticleId(article_id);
  const articleExistenceQuery = checkArticleExist(article_id);
  Promise.all([findCommentsQuery, articleExistenceQuery])
    .then((response) => {
      const comments = response[0];
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;

  const articleExistenceQuery = checkArticleExist(article_id);
  const queries = [articleExistenceQuery];
  if (articleExistenceQuery.msg !== "Not Found") {
    const insertCommentQuery = insertComment(article_id, newComment);
    queries.push(insertCommentQuery);
  }

  Promise.all(queries)
    .then((response) => {
      const comment = response[1];
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

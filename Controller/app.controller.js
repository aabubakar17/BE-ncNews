const {
  fetchTopics,
  fetchEndpoints,
  findArticleById,
  fetchArticles,
  findCommentsByArticleId,
  insertComment,
  updateArticleById,
  removeCommentById,
  fetchUsers,
} = require("../Model/app.model");
const {
  checkArticleExist,
  checkNewVote,
  checkTopicExist,
  checkSortQuery,
  checkOrderQuery,
} = require("./utils.controller");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((resEndpoints) => {
      res.status(200).send({ resEndpoints });
    })
    .catch((err) => {
      next(err);
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

exports.getArticles = (req, res, next) => {
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order } = req.query;

  const queries = [fetchArticles(topic, sort_by, order)];
  if (topic) {
    const topicExistQuery = checkTopicExist(topic);
    queries.push(topicExistQuery);
  } else if (sort_by) {
    const sortExistQuery = checkSortQuery(sort_by);
    queries.push(sortExistQuery);
  } else if (order) {
    const orderExistQuery = checkOrderQuery(order);
    queries.push(orderExistQuery);
  }

  Promise.all(queries)
    .then((response) => {
      articles = response[0];
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const newVote = req.body.inc_votes;
  const newVoteQuery = checkNewVote(newVote);
  const UpdateArticleQuery = updateArticleById(article_id, newVote);
  const articleExistenceQuery = checkArticleExist(article_id);

  Promise.all([UpdateArticleQuery, newVoteQuery, articleExistenceQuery])
    .then((response) => {
      const article = response[0];
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentbyId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

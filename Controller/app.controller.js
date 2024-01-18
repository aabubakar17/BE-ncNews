const {
  fetchTopics,
  fetchEndpoints,
  findArticleById,
  fetchArticles,
  findCommentsByArticleId,
  insertComment,
  updateArticleById,
  removeCommentById,
} = require("../Model/app.model");
const { checkArticleExist, checkNewVote } = require("./utils.controller");

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
      console.log(err);
      next(err);
    });
};

exports.deleteCommentbyId = (req, res, next) => {
  const { comment_id } = req.params;
  //console.log(comment_id);
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

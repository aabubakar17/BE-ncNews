exports.articleNotFoundError = (err, req, res, next) => {
  if (err.msg === "Not Found") {
    res.status(404).send({ msg: "article does not exist" });
  } else {
    next(err);
  }
};

exports.invalidArticleError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.invalidRequestBodyError = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(400).send({ msg: "Invalid Schema. Bad Request" });
  } else {
    next(err);
  }
};

exports.NoRequestBodyError = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "No Request body. Bad Request" });
  } else {
    next(err);
  }
};

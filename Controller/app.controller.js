const { fetchTopics } = require("../Model/app.model");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

const { fetchTopics, fetchEndpoints } = require("../Model/app.model");

exports.getTopics = (req, res) => {
  console.log(req.route);
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getEndpoints = (req, res) => {
  fetchEndpoints().then((resEndpoints) => {
    res.status(200).send({ resEndpoints });
  });
};

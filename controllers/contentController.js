const Topics = require("../models/topic");
const Questions = require("../models/question");

module.exports.topic = (req, res) => {
  Topics.find().then((result) => {
    res.render("topic", { title: "Topics", topics: result });
  });
};

module.exports.question = (req, res) => {
  const name = req.params.name;
  Topics.findOne({ name: name }).then((result1) => {
    Questions.find({ topic: result1._id })
      .then((result) => {
        res.render("details", { questions: result, title: result1.name });
      })
      .catch((err) =>
        res.status(404).render("404", { title: "Page not found" })
      );
  });
};

module.exports.newQuestion_GET = (req, res) => {
  Topics.find().then((result) => {
    res.render("newQuestion", { title: "New Question", topics: result });
  });
};

module.exports.newQuestion_POST = (req, res) => {
  const question = new Questions(req.body);
  var topic;
  // console.log(req.body.topic);
  Topics.findById(req.body.topic).then((result) => {
    topic = result.name;
    // console.log("/topic/" + topic);
  });
  question
    .save()
    .then((result) => res.redirect("/topic/" + topic))
    .catch((err) => console.log(err));
};

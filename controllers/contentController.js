const Topics = require("../models/topic");
const Questions = require("../models/question");

module.exports.topic = (req, res) => {
  Topics.find().then((result) => {
    res.render("topic", { title: "Topics", topics: result });
  });
};

module.exports.topic_DELETE = (req, res) => {
  console.log("aaa");
  var topic;
  const id = req.params.id;
  Questions.findById(id)
    .populate("topic")
    .then((question) => {
      topic = question.topic.name;
      Questions.findByIdAndDelete(id)
        .then((result) => {
          res.json({ redirect: "/topic/" + topic });
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    });
};

module.exports.question = (req, res) => {
  const name = req.params.name;
  Topics.findOne({ name: name }).then((result1) => {
    if (result1) {
      Questions.find({ topic: result1._id })
        .then((result) => {
          res.render("details", { questions: result, title: result1.name });
        })
        .catch((err) =>
          res.status(404).render("404", { title: "Page not found" })
        );
    } else res.status(404).render("404", { title: "Page not found" });
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
  Topics.findById(req.body.topic).then((result) => {
    topic = result.name;
  });
  question
    .save()
    .then((result) => res.redirect("/topic/" + topic))
    .catch((err) => console.log(err));
};

const Topics = require("../models/topic");
const Questions = require("../models/question");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.topic = (req, res) => {
  Topics.find().then((result) => {
    res.render("topic", { title: "Topics", topics: result });
  });
};

// var realtypeof = function (obj) {
//   switch (typeof obj) {
//     // object prototypes
//     case "object":
//       if (obj instanceof Array) return "[object Array]";
//       if (obj instanceof Date) return "[object Date]";
//       if (obj instanceof RegExp) return "[object regexp]";
//       if (obj instanceof String) return "[object String]";
//       if (obj instanceof Number) return "[object Number]";

//       return "object";
//     // object literals
//     default:
//       return typeof obj;
//   }
// };

// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// module.exports.topic_DELETE = (req, res) => {
//   console.log("aaa");
//   const id = req.params.id;
//   var topicID, topic;
//   Questions.findById(id).then((result) => {
//     topicID = String(result.topic);
//     console.log(topicID, realtypeof(topicID), [topicID]);
//   });
//   // Topics.findById(new ObjectId(topicID)).then((result) => {
//   Topics.findOne({ _id: ObjectId(topicID) }).then((result) => {
//     topic = result.name;
//     console.log(result.name);
//   });
//   Questions.findByIdAndDelete(id)
//     .then((result) => {
//       res.json({ redirect: "/topic/" + topic });
//     })
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
// };

module.exports.topic_DELETE = (req, res) => {
  console.log("aaa");
  var topic;
  const id = req.params.id;
  Questions.findById(id)
    .populate("topic")
    .then((question) => {
      //console.log(question, question.topic.name);
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

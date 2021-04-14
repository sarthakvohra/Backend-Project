const mongoose = require("mongoose");
const schema = mongoose.Schema;

const questionSchema = new schema({
  name: { type: String, required: [true, "Please enter the question"] },
  linkTo: { type: String, required: [true, "Please paste the link"] },
  topic: { type: schema.Types.ObjectId, ref: "topic" },
});

const Question = mongoose.model("question", questionSchema);
module.exports = Question;

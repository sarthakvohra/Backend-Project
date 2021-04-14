const mongoose = require("mongoose");
const schema = mongoose.Schema;

const topicSchema = new schema({
  name: { type: String, required: [true, "Please enter a topic"] },
});

const Topic = mongoose.model("topic", topicSchema);
module.exports = Topic;

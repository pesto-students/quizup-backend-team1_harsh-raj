const mongoose = require("mongoose");

const MockQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{ type: String }],
  answer: String,
});

module.exports = mongoose.model("MockQuestion", MockQuestionSchema);

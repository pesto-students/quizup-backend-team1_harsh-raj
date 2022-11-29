const mongoose = require("mongoose");

const MockQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{ type: String }],
  answer: String,
  mock: {
    type: mongoose.Types.ObjectId,
    ref: "Mock",
  },
});

module.exports = mongoose.model("MockQuestion", MockQuestionSchema);

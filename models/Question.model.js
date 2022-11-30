const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [{ type: String }],
	answer: String,
});

module.exports = mongoose.model("Question", QuestionSchema);

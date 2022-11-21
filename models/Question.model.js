const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [{ type: String }],
	answer: String,
	quiz: {
		type: mongoose.Types.ObjectId,
		ref: "Quiz",
	},
});

module.exports = mongoose.model("Question", QuestionSchema);

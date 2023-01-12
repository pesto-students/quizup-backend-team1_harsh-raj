const mongoose = require("mongoose");

const QuestionMCQSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [{ type: String }],
	answer: String,
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Quiz",
	},
});

module.exports = mongoose.model("QuestionMCQ", QuestionMCQSchema);

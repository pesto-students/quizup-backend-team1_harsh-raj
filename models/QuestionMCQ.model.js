const mongoose = require("mongoose");

const QuestionMCQSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [{ type: String }],
	answer: String,
});

module.exports = mongoose.model("QuestionMCQ", QuestionMCQSchema);

const mongoose = require("mongoose");

const QuestionTFSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [
		{
			type: String,
			enum: ["True", "False"],
		},
	],
	answer: String,
});

module.exports = mongoose.model("QuestionTF", QuestionTFSchema);

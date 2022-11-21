const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Quiz", QuizSchema);

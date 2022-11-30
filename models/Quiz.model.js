const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
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
		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Question",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Quiz", QuizSchema);

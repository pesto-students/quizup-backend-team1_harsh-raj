const mongoose = require("mongoose");
const { Schema } = mongoose;

const MockTestSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: "QuestionMCQ",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("MockTest", MockTestSchema);

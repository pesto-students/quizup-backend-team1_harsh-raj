const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExamSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		tests: [
			{
				type: Schema.Types.ObjectId,
				ref: "MockTest",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Exam", ExamSchema);

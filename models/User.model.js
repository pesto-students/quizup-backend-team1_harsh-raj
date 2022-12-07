const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
	{
		googleId: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		mock_test_given: [
			{
				title: String,
				total_questions: Number,
				questions_attempted: Number,
				score: Number,
				wrong_answers: Number,
			},
		],
		quiz_given: [
			{
				title: String,
				total_questions: Number,
				questions_attempted: Number,
				score: Number,
				wrong_answers: Number,
			},
		],
		bank_details: {
			account_no: String,
			ifs_code: String,
		},
		skills: [{ String }],
		about: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", UserSchema);

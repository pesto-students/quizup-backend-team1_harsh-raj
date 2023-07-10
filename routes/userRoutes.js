const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// @desc	Update user with quiz result
// @route	POST /api/users/quiz
router.post("/quiz", async (req, res) => {
	try {
		const quizResult = req.body;

		await User.findOneAndUpdate(
			{ email: quizResult.email },
			{
				$push: {
					quiz_given: {
						quizId: quizResult.quizId,
						title: quizResult.title,
						total_questions: quizResult.total_questions,
						questions_attempted: quizResult.questions_attempted,
						score: quizResult.score,
						wrong_answers: quizResult.wrong_answers,
					},
				},
			}
		);

		res.status(200).json({
			title: quizResult.title,
			total_questions: quizResult.total_questions,
			questions_attempted: quizResult.questions_attempted,
			score: quizResult.score,
			wrong_answers: quizResult.wrong_answers,
		});
	} catch (err) {
		console.log(err);
	}
});

// @desc	Update user with test result
// @route	POST /api/users/test
router.post("/test", async (req, res) => {
	try {
		const testResult = req.body;

		await User.findOneAndUpdate(
			{ email: testResult.email },
			{
				$push: {
					mock_test_given: {
						testId: testResult.testId,
						title: testResult.title,
						total_questions: testResult.total_questions,
						questions_attempted: testResult.questions_attempted,
						score: testResult.score,
						wrong_answers: testResult.wrong_answers,
					},
				},
			}
		);

		res.status(200).json({
			title: testResult.title,
			total_questions: testResult.total_questions,
			questions_attempted: testResult.questions_attempted,
			score: testResult.score,
			wrong_answers: testResult.wrong_answers,
		});
	} catch (err) {
		console.log(err);
	}
});

// @desc	Google Auth login
// @route	POST /api/users/login
router.post("/login", async (req, res) => {
	try {
		const userData = req.body;

		if (!userData) {
			res.status(401);
			throw new Error("Not authorized, no token");
		}

		let userEmail = userData.email;

		let user = await User.findOne({ email: userEmail });

		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				fullName: user.displayName,
				email: user.email,
				message: "Logged In",
			});
		} else {
			let newUser = {
				googleId: userData.sub,
				email: userData.email,
				displayName: userData.name,
				lastName: userData.family_name,
				firstName: userData.given_name,
				image: userData.picture,
			};

			let createdUser = await User.create(newUser);

			res.status(201).json({
				firstName: createdUser.firstName,
				fullName: createdUser.displayName,
				email: createdUser.email,
				message: "Logged In",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// @desc Demo user login
// @route POST /api/users/demo
router.post("/demo", async (req, res) => {
	try {
		const user = await User.findOne({ email: "demo@gmail.com" }).lean();

		if (!user) {
			res.status(404);
			throw new Error("User not found");
		} else {
			res.status(200).json({
				firstName: user.firstName,
				fullName: user.displayName,
				email: user.email,
				message: "Logged In",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// @desc	Get user data
// @route	post /api/users/getme
router.post("/getme", async (req, res) => {
	try {
		const data = req.body;

		const user = await User.findOne({ email: data.email }).lean();

		if (!user) throw new Error("User not found");

		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;

const router = require("express").Router();
const Quiz = require("../models/Quiz.model");

// @desc    Get all quizzes
// @route   GET /quiz
router.get("/", async (req, res) => {
	try {
		const quizzes = await Quiz.find();

		res.send(quizzes);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Create a quiz
// @route   POST /quiz
router.post("/", async (req, res) => {
	try {
		await Quiz.create(req.body);
		res.send("new quiz created");
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

module.exports = router;

const router = require("express").Router();
const Quiz = require("../models/Quiz.model");
const Question = require("../models/Question.model");

// @desc    Get all quizzes
// @route   GET /quiz
router.get("/", async (req, res) => {
	try {
		const quizzes = await Quiz.find().populate("questions").lean();

		res.json(quizzes);
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

// @desc    Add question to quiz
// @route   POST /quiz/question
router.post("/question", async (req, res) => {
	try {
		const quizId = req.body.id;
		const newQuestion = await Question.create({
			question: "This is a sample question?",
			options: ["option 1", "option 2", "option 3", "option 4"],
			answer: "option 3",
		});

		const quiz = await Quiz.findById(quizId);

		quiz.questions.push(newQuestion);

		res.send(`question added to quiz id: ${quizId}`);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

module.exports = router;

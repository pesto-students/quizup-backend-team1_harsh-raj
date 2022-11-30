const router = require("express").Router();
const Quiz = require("../models/Quiz.model");
const Question = require("../models/Question.model");

// @desc    Get all quizzes
// @route   GET /quiz
router.get("/", async (req, res) => {
	try {
		const quizzes = await Quiz.find().populate("questions");

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

// @desc    Add question to quiz
// @route   POST /quiz/question
router.post("/question", async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.body.id).lean();

		if (!quiz) throw new Error("Quiz not found");

		const newQuestion = await Question.create({
			question: "This is a new another question?",
			options: ["option 1", "option 2", "option 3", "option 4"],
			answer: "option 3",
		});

		await Quiz.updateOne(
			{ _id: req.body.id },
			{ $push: { questions: newQuestion._id } }
		);

		res.send(`question added to quiz`);
	} catch (err) {
		console.log(err);
		res.end(err.message);
	}
});

module.exports = router;

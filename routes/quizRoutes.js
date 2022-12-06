const router = require("express").Router();
const Quiz = require("../models/Quiz.model");
const QuestionMCQ = require("../models/QuestionMCQ.model");
const QuestionTF = require("../models/QuestionTF.model");
const mongoose = require("mongoose");

// @desc    Get all quizzes
// @route   GET /api/quiz
router.get("/", async (req, res) => {
	try {
		const quizzes = await Quiz.find();
		res.status(200).json(quizzes);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Get five quizzes
// @route   GET /api/quiz/5
router.get("/5", async (req, res) => {
	try {
		const quizzes = await Quiz.find().sort({ createdAt: -1 }).limit(5);
		res.status(200).json(quizzes);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Get single quiz
// @route   GET /api/quiz/:id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		console.log(id);
		const quiz = await Quiz.aggregate([
			{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
			{
				$lookup: {
					from: "questiontfs",
					localField: "questions",
					foreignField: "_id",
					as: "questionstf",
				},
			},
			{
				$lookup: {
					from: "questionmcqs",
					localField: "questions",
					foreignField: "_id",
					as: "questionsmcq",
				},
			},
			// {
			// 	$group: {
			// 		_id: "$title",
			// 		allQuestions: { $push: "$questionstf" },
			// 	},
			// },
		]);

		res.status(200).json(quiz);
	} catch (err) {
		console.log(err);
		res.status(400).end("error");
	}
});

// @desc    Create a quiz
// @route   POST /api/quiz
router.post("/", async (req, res) => {
	try {
		await Quiz.create(req.body);
		res.status(201).send("new quiz created");
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Add questions array to quiz
// @route   POST /api/quiz/:id
router.post("/:id", async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id).lean();

		if (!quiz) throw new Error("Quiz not found");

		let questionsArray = req.body;

		let questionIdsArr = [];

		Promise.all(
			questionsArray.map(async (question) => {
				question.quizId = quiz._id;
				if (question.type === "mcq") {
					let newQues = await QuestionMCQ.create(question);
					questionIdsArr.push(newQues._id);
				} else if (question.type === "tf") {
					let newQues = await QuestionTF.create(question);
					questionIdsArr.push(newQues._id);
				} else {
					throw new Error("question type not mentioned");
				}
			})
		).then(async function () {
			await Quiz.updateOne({ _id: quiz._id }, { questions: questionIdsArr });
		});

		// const newQuestion = await Question.create({
		// 	question: "This is a new another question?",
		// 	options: ["option 1", "option 2", "option 3", "option 4"],
		// 	answer: "option 3",
		// });

		res.status(200).json("added questions to quiz");
	} catch (err) {
		console.log(err);
		res.end(err.message);
	}
});

module.exports = router;

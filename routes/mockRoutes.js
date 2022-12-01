const express = require("express");
const router = express.Router();
const MockTest = require("../models/MockTests.model");
const QuestionMCQ = require("../models/QuestionMCQ.model");
const Exam = require("../models/Exam.model");

// @desc    Get a single Mock test
// @route   GET /api/test/:id
router.get("/:id", async (req, res) => {
	try {
		const test = await MockTest.findById(req.params.id).populate("questions");
		res.status(200).json(test);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Create a Mock test
// @route   POST /api/test
router.post("/", async (req, res) => {
	try {
		const exam = await Exam.findOne({ title: req.body.exam });

		if (!exam) throw new Error("Exam not found");

		const newTest = await MockTest.create(req.body);

		// adding the newly created test to exam
		await Exam.updateOne({ _id: exam._id }, { $push: { tests: newTest._id } });

		res.status(201).send("new mock created");
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

// @desc    Add questions array to mock test
// @route   POST /api/test/:id
router.post("/:id", async (req, res) => {
	try {
		const test = await MockTest.findById(req.params.id).lean();

		if (!test) throw new Error("Mock test not found");

		let questionsArray = req.body;

		let questionIdsArr = [];

		Promise.all(
			questionsArray.map(async (question) => {
				let newQues = await QuestionMCQ.create(question);
				questionIdsArr.push(newQues._id);
			})
		).then(async function () {
			await MockTest.updateOne(
				{ _id: test._id },
				{ questions: questionIdsArr }
			);
		});

		res.status(200).json("added questions to mock test");
	} catch (err) {
		console.log(err);
		res.end(err.message);
	}
});

// @desc    Delete a Mock test
// @route   DELETE /api/test/:id
router.delete("/:id", async (req, res) => {
	try {
		await MockTest.findByIdAndDelete(req.params.id);
		res.status(200).json(test);
	} catch (err) {
		console.log(err);
		res.end("error");
	}
});

module.exports = router;

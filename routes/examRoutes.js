const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam.model");

// @desc    Get all Exams
// @route   GET /api/exam
router.get("/", async (req, res) => {
	try {
		const exams = await Exam.find();
		res.status(200).json(exams);
	} catch (err) {
		console.log(err.message);
		res.status(500).json("error");
	}
});

// @desc    Get five Exams (for user dashboard)
// @route   GET /api/exam/5
router.get("/5", async (req, res) => {
	try {
		const exams = await Exam.find().limit(5);
		res.status(200).json(exams);
	} catch (err) {
		console.log(err.message);
		res.status(500).json("error");
	}
});

// @desc    Get all tests in a single exam
// @route   GET /api/exam/:id
router.get("/:id", async (req, res) => {
	try {
		const tests = await Exam.findById(req.params.id).populate("tests");
		res.status(200).json(tests);
	} catch (err) {
		console.log(err.message);
		res.end("error");
	}
});

// @desc    Create an exam
// @route   POST /api/exam
router.post("/", async (req, res) => {
	try {
		await Exam.create(req.body);
		res.status(201).send("new exam created");
	} catch (err) {
		console.log(err.message);
		res.end("error");
	}
});

// @desc    Delete an Exam
// @route   DELETE /api/exam/:id
router.delete("/:id", async (req, res) => {
	try {
		await Exam.deleteOne({ _id: req.params.id });
		res.status(200).json("Exam deleted");
	} catch (err) {
		console.log(err.message);
		res.end("error");
	}
});

module.exports = router;

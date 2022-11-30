const express = require("express");
const router = express.Router();

// @desc    Get Exam
// @route   GET /mock/exam
router.get("/", async (req, res) => {
  const exams = await Exam.find().populate("mock");

  res.send(exams);
});

// @desc    Create a exam
// @route   GET /mock/exam
router.post("/", async (req, res) => {
  await Exam.create(req.body);
  res.send("new exam created");
});

module.exports = router;

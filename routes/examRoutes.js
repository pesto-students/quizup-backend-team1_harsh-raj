const express = require("express");
const router = express.Router();

// @desc    Get Exam
// @route   GET /mock/exam
router.get("/", (req, res) => {
  res.status(200).json({ message: "GET exam" });
});

// @desc    Create a exam
// @route   GET /mock/exam
router.post("/", (req, res) => {
  res.status(200).json({ message: "POST exam" });
});

module.exports = router;

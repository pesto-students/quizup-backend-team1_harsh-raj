const express = require("express");
const router = express.Router();
const Mock = require("../models/MockModel");
const MockQuestion = require("../models/MockQuestion.model");

// @desc    Get mock
// @route   GET /mock
router.get("/", async (req, res) => {
  try {
    const mocks = await Mock.find();
  } catch (err) {
    console.log(err);
    res.end("error");
  }
});

// @desc    Create a mock
// @route   POST /mock
router.post("/", async (req, res) => {
  try {
    const mocks = await Mock.create(req.body);
    res.send("new mock created");
  } catch (err) {
    console.log(err);
    res.end("error");
  }
});

// @desc    Add question to mock
// @route   POST /mock/question
router.post("/question", async (req, res) => {
  try {
    res.status(200).json({ message: "Adding questions" });
  } catch (err) {
    console.log(err);
    res.end("error");
  }
});

module.exports = router;

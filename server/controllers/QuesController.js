// Updated controllers/questionController.js with cardid handling
const Question = require("../models/Questions");

const getAllQuestions = async (_req, res) => {
  try {
    const questions = await Question.find();
    if (questions) {
      res.status(200).json({ questions });
    } else {
      res.status(404).json({ message: "Questions not found" });
    }
  } catch (error) {
    console.error("Get all questions error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.error("Get question by id error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createQuestion = async (req, res) => {
  const { question, output, stdin, cardid } = req.body; // Added cardid to the destructuring
  try {
    const newQuestion = new Question({
      question,
      output,
      stdin,
      cardid,
    });
    await newQuestion.save();
    res
      .status(201)
      .json({
        message: "Question successfully created",
        question: newQuestion,
      });
  } catch (error) {
    console.error("Create question error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, output, stdin, cardid } = req.body;

  try {
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    existingQuestion.question = question || existingQuestion.question;
    existingQuestion.output = output || existingQuestion.output;
    existingQuestion.stdin = stdin || existingQuestion.stdin;
    existingQuestion.cardid = cardid || existingQuestion.cardid;

    await existingQuestion.save();
    res.status(200).json({ message: "Question successfully updated", question: existingQuestion });
  } catch (error) {
    console.error("Update question error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res
      .status(200)
      .json({
        message: "Question successfully deleted",
        question: deletedQuestion,
      });
  } catch (error) {
    console.error("Delete question error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

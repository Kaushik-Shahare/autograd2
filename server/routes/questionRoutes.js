// routes/questionRoutes.js
const express = require('express');
const Quesrouter = express.Router();
const questionController = require('../controllers/QuesController');

// GET all questions
Quesrouter.get('/getall', questionController.getAllQuestions);

// GET a question by ID
Quesrouter.get('/id', questionController.getQuestionById);

// POST create a new question
Quesrouter.post('/creatques', questionController.createQuestion);

// PUT update a question by ID
Quesrouter.put('/:id', questionController.updateQuestion);

// DELETE a question by ID
Quesrouter.delete('/:id', questionController.deleteQuestion);

module.exports = Quesrouter;

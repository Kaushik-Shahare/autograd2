const mongoose = require("mongoose");

// Define the schema
const gradeSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Questions", // Assuming this references a Question collection
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming this references a Student collection
  },
  grade: {
    type: Number, // or String, depending on how you want to store the grade
    required: true,
  },
});

// Create the model
const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;

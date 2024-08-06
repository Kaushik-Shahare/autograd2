const mongoose = require("mongoose");

// Define the schema
const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming this references a User collection
    },
    grade: {
      type: Number, // or String, depending on how you want to store the grade
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;

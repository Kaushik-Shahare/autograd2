const mongoose = require("mongoose");

const QuesSchema = new mongoose.Schema(
  {
    // Who can attempt this question

    question: {
      type: String,
      required: true,
    },
    output: {
      type: [String],
      required: true,
    },
    stdin: {
      type: [String],
    },
    cardid: {
      type: String,
      required: true,
    },
    grades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Questions", QuesSchema);

module.exports = Question;

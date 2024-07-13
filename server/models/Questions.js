const mongoose = require("mongoose");

const QuesSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    stdin: {
      type: String,
    },
    cardid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Questions", QuesSchema);

module.exports = Question;

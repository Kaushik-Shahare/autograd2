import React from "react";

const Question = ({ question, deleteQuestion }) => {
  const deletequestion = () => {
    deleteQuestion(question._id);
  };
  return (
    <div className="card bg-dark text-white  animate-fadeIn pl-20 ml-20 mr-20 relative">
      <h1 className="text-red-500">{question.question}?</h1>
      <p className="text-blue-500">Output: </p>
      {question.output && <p className="">{question.output}</p>}
      <p className="text-blue-500">StdIn: </p>
      {question.stdin && <p className="">{question.stdin}</p>}
      <button
        onClick={deletequestion}
        className="bg-red-800 rounded w-12 absolute right-3 top-3"
      >
        D
      </button>
    </div>
  );
};

export default Question;

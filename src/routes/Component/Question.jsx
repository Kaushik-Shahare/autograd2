import React, { useState } from "react";
import { useQuestionContext } from "../../context/dataHandler";
import GraderForm from './GraderForm';
import { useNavigate } from "react-router-dom";

const Question = ({ question, deleteQuestion }) => {
  const navigate = useNavigate();
  const { updateAndNavigate } = useQuestionContext();
  const [showComponent, setShowComponent] = useState(false);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  const deletequestion = (event) => {
    event.stopPropagation();
    deleteQuestion(question._id);
  };

  const handleSubmit = () => {
    updateAndNavigate(question.output, question.stdin, question._id);
    navigate("/editor");
  };

  return (
    <div className="question-card relative p-6 bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-red-500 text-xl font-bold mb-4">{question.question}?</h1>
      <div className="action-buttons absolute right-4 top-4 flex space-x-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition duration-300"
        >
          Submit
        </button>
        <button 
          onClick={deletequestion} 
          className="bg-red-700 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition duration-300"
        >
          Delete
        </button>
        <button 
          onClick={toggleComponent} 
          className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-300"
        >
          Update
        </button>
      </div>
      {showComponent && <GraderForm questionId={question._id} />}
    </div>
  );
};

export default Question;

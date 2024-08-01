import React from "react";
import { useQuestionContext } from "../../context/dataHandler";
import { graderForm } from './graderForm';

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
    <div className="card bg-dark text-white animate-fadeIn pl-20 ml-20 mr-20 relative ">
      <h1 className="text-red-500 h-12">{question.question}?</h1>
      {/* <p className="text-blue-500">Output: </p>
      {question.output && <p className="">{question.output}</p>}
      <p className="text-blue-500">StdIn: </p>
      {question.stdin && <p className="">{question.stdin}</p>} */}
      <div className="absolute right-3 top-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-800 rounded w-12 mr-2"
        >
          S
        </button>
        <button onClick={deletequestion} className="bg-red-800 rounded w-12 ">
          D
        </button>
        <button 
        onClick={toggleComponent} className="bg-green-800 rounded w-12 ">
        U
        </button>
      </div>
        {showComponent && <graderForm questionId={question._id} />}
    </div>
  );
};

export default Question;

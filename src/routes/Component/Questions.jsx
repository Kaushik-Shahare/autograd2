import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import Output from "../../components/Output";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedData, setSelectedData] = useState({ output: "", stdin: "" });

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/api/questions/getall")
        .then((response) => {
          setQuestions(response.data.questions);
        });
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  }, []);

  const handleSelectQuestion = (questionId) => {
    // Fetch question details including output from the database
    axios
      .get(`http://localhost:3001/api/questions/id/${questionId}`)
      .then((response) => {
        // Assuming the response contains the question details including output
        setSelectedData({
          ...selectedData,
          output: response.data.output,
          stdin: response.data.stdin,
          // Include other data you might need
        });
      })
      .catch((error) => {
        console.error("Failed to fetch question details:", error);
      });
  };

  const updateQuestions = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const deleteQuestion = (questionId) => {
    try {
      axios
        .delete(`http://localhost:3001/api/questions/${questionId}`)
        .then((response) => {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question._id !== questionId)
          );
        });
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  return (
    <div>
      <NavBar />

      <AddQuestion updateQuestions={updateQuestions} />

      <div className="space-y-4  justify-start items-stretch gap-4">
        {questions.map((question) => (
          <div
            key={question._id}
            className="flex-1 min-w-[200px] max-w-[250px] h-[300px] "
          >
            <Question question={question} deleteQuestion={deleteQuestion} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;

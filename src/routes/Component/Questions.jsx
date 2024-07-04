import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { defineCssVars } from "@chakra-ui/react";
import AddQuestion from "./AddQuestion";
import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

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
            className="flex-1 min-w-[200px] max-w-[250px] h-[300px]"
          >
            <Question question={question} deleteQuestion={deleteQuestion} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;

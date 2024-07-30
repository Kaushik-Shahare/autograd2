import React, { useState, createContext, useContext } from "react";

const QuestionContext = createContext();

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }) => {
  const [output, setOutput] = useState([]);
  const [stdin, setStdin] = useState("");
  const [questionId, setquestionId] = useState("");

  const updateAndNavigate = (newOutput, newStdin, newquestionId) => {
    setOutput(Array.isArray(newOutput) ? newOutput : [newOutput]);
    setStdin(newStdin);
    setquestionId(newquestionId);
  };

  return (
    <QuestionContext.Provider value={{ output, stdin, questionId, updateAndNavigate }}>
      {children}
    </QuestionContext.Provider>
  );
};

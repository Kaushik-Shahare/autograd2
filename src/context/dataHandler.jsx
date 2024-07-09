import React, { useState, createContext, useContext } from "react";

const QuestionContext = createContext();

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }) => {
  const [output, setOutput] = useState([]);
  const [stdin, setStdin] = useState("");

  const updateAndNavigate = (newOutput, newStdin) => {
    setOutput(Array.isArray(newOutput) ? newOutput : [newOutput]);
    setStdin(newStdin);
  };

  return (
    <QuestionContext.Provider value={{ output, stdin, updateAndNavigate }}>
      {children}
    </QuestionContext.Provider>
  );
};

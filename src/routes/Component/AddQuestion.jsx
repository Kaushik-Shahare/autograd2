import React, { useState } from "react";

const AddQuestion = ({ updateQuestions }) => {
  const [showForm, setShowForm] = useState(false);
  const handleFormSubmit = async ({ question, output, stdin, cardid }) => {
    const newQuestion = { question, output, stdin, cardid };

    try {
      // Send a POST request to the server using the updated route with full URL
      const response = await fetch(
        "http://localhost:3001/api/questions/creatques",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        }
      );

      // Check if the request was successful
      if (response) {
        const createdQuestion = await response.json();
        updateQuestions(createdQuestion.question);
        // Update your state or UI here with the new question
        // setQuestions(prevQuestions => [...prevQuestions, createdQuestion]);
        setShowForm(false); // Hide form after successful submission
      } else {
        // Handle server errors or invalid responses
        console.error("Failed to create question:", response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="justify-center text-center mt-4 mb-4">
      {/* Existing JSX */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 rounded p-2"
      >
        Add Question
      </button>
      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit({
              question: e.target.question.value,
              output: e.target.output.value,
              stdin: e.target.stdin.value,
              cardid: e.target.cardid.value,
            });
          }}
          className="flex flex-col gap-2 mt-4 mb-4 w-1/2 mx-auto"
        >
          <input type="text" name="question" placeholder="Question" />
          <input type="text" name="output" placeholder="Output" />
          <input type="text" name="stdin" placeholder="Stdin" />
          <input type="text" name="cardid" placeholder="Card ID" />
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-500 rounded p-2"
          >
            Submit
          </button>
        </form>
      )}
      {/* Render questions or other components */}
    </div>
  );
};

export default AddQuestion;

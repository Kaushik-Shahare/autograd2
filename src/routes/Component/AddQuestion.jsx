import React, { useState } from "react";
import "./Styles/AddQuestion.css"; // Import the CSS file

const AddQuestion = ({ updateQuestions }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = async ({ question, output, stdin, cardid }) => {
    const newQuestion = { question, output, stdin, cardid };

    try {
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

      if (response.ok) {
        const createdQuestion = await response.json();
        updateQuestions(createdQuestion.question);
        setShowForm(false); // Hide form after successful submission
      } else {
        console.error("Failed to create question:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => setShowForm(true)}
        className="add-question-button" // Updated class
      >
        Add Question
      </button>
      {showForm && (
        <div className="overlay">
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
            className="form"
          >
            <input type="text" name="question" placeholder="Question" required />
            <input type="text" name="output" placeholder="Output" required />
            <input type="text" name="stdin" placeholder="Stdin" required />
            <input type="text" name="cardid" placeholder="Card ID format: [1,2,3]" required />
            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;

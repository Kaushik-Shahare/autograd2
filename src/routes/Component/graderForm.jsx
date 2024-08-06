import React, { useState } from 'react';
import axios from 'axios';
import './InputOutputForm.css';

function GraderForm({ questionId }) {
  const [isVisible, setIsVisible] = useState(true);
  const [inputs, setInputs] = useState(Array(5).fill(''));
  const [outputs, setOutputs] = useState(Array(5).fill(''));
  const [change, setChange] = useState(false);

  const toggleFormVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    setChange(true);
  };

  const handleOutputChange = (index, event) => {
    const newOutputs = [...outputs];
    newOutputs[index] = event.target.value;
    setOutputs(newOutputs);
    setChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3001/api/questions/${questionId}`, {
          stdin: inputs,
          output: outputs,
        });
        console.log('response', response);
      } catch (error) {
        console.error('Error submitting data: ', error);
      }
      setChange(false);
    };

  return (
    <div className="container">
      {/* <button className="button-toggle" onClick={toggleFormVisibility}>
        {isVisible ? 'Hide Form' : 'Show Form'}
      </button> */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <form className="form" onSubmit={handleSubmit}>
              {inputs.map((input, index) => (
                <div key={`group-${index}`} className="input-output-group">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor={`input-${index}`} className="text-white">Input {index + 1}:</label>
                    <input
                      type="text"
                      id={`input-${index}`}
                      className="input-field rounded-lg p-2 bg-transparent text-white border-b border-l border-white"
                      value={input}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor={`output-${index}`} className="text-white">Output {index + 1}:</label>
                    <input
                      type="text"
                      id={`output-${index}`}
                      className="output-field rounded-lg p-2 bg-transparent text-white border-b border-l border-white"
                      value={outputs[index]}
                      onChange={(e) => handleOutputChange(index, e)}
                    />
                  </div>
                </div>
              ))}
              <div className="button-group">
                {change && (
                  <button className="button-submit" type="submit">Submit</button>
                )}
                <button className="close-button" type="button" onClick={toggleFormVisibility}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraderForm;

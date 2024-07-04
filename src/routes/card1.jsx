import React, { useState, useEffect } from "react";
import "../style/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Card = () => {
  const navigate = useNavigate();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [username, setUsername] = useState("Free");
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Using axios to replace 'fetch'
        const response = await axios.get('http://localhost:3001/api/questions/getall');
        setQuestions([response.data.questions]); // Update state with fetched questions
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
  }, []);


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    else{
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".profile-dropdown-btn") &&
        !event.target.closest(".profile-dropdown-list")
      ) {
        setDropdownActive(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFormSubmit = async ({ question, output, stdin, cardid }) => {
    const newQuestion = { question, output, stdin, cardid };

    try {
        // Send a POST request to the server using the updated route with full URL
        const response = await fetch('http://localhost:3001/api/questions/creatques', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestion),
        });

        // Check if the request was successful
        if (response) {
            const createdQuestion = await response.json();
            // Update your state or UI here with the new question
            // setQuestions(prevQuestions => [...prevQuestions, createdQuestion]);
            setShowForm(false); // Hide form after successful submission
        } else {
            // Handle server errors or invalid responses
            console.error('Failed to create question:', response.statusText);
        }
    } catch (error) {
        // Handle network errors
        console.error('Error submitting form:', error);
    }
};

  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Small Business - Start Bootstrap Template</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link href="css/styles.css" rel="stylesheet" />
        
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <a className="navbar-brand" href="#!">
            AutoLink
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#!">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Grades
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <div className="profile-dropdown">
                  <div
                    className="profile-dropdown-btn"
                    onClick={toggleDropdown}
                  >
                    <div className="profile-img">
                      <i className="fa-solid fa-circle"></i>
                    </div>
                    <span>
                      {username}
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                  <ul
                    className={`profile-dropdown-list ${
                      dropdownActive ? "active" : ""
                    }`}
                  >
                    <li className="profile-dropdown-list-item">
                      <a href="#">
                        <i className="fa-regular fa-user"></i>
                        Edit Profile
                      </a>
                    </li>
                    <hr />
                    <li className="profile-dropdown-list-item">
                      <a href="#" onClick={logout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
      {/* Existing JSX */}
      <button onClick={() => setShowForm(true)}>Add Question</button>
      {showForm && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit({
            question: e.target.question.value,
            output: e.target.output.value,
            stdin: e.target.stdin.value,
            cardid: e.target.cardid.value,
          });
        }}>
          <input type="text" name="question" placeholder="Question" />
          <input type="text" name="output" placeholder="Output" />
          <input type="text" name="stdin" placeholder="Stdin" />
          <input type="text" name="cardid" placeholder="Card ID" />
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Render questions or other components */}
    </div>
      <ul>
      {questions.map((question) => (
        <li key={question.id}>{question.text}</li> // Assuming each question has an 'id' and 'text'
      ))}
    </ul>
      </>
      
  );
};

export default Card;
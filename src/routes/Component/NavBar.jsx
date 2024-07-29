import React, { useEffect, useState } from "react";
import "../../style/styles.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [dropdownActive, setDropdownActive] = useState(false);
  const username = localStorage.getItem("username");
  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
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

  return (
    <div>
      {" "}
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
                <a className="nav-link active" aria-current="page" href="/home">
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
                      <a style={{ color: "white" }}>{username}</a>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                  <ul
                    className={`profile-dropdown-list ${
                      dropdownActive ? "active" : ""
                    }`}
                  >
                    <li className="profile-dropdown-list-item">
                      <a href="/profile">
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
    </div>
  );
};

export default NavBar;

import React from "react";
import Navbar from "./component/Navbar";
// import GraderForm from './Component/GraderForm';
import StudentGrades from "../components/Grades/StudentGrades";

const Grade = () => {
  return (
    <div>
      <Navbar />
      {/* <GraderForm /> */}
      <StudentGrades />
    </div>
  );
};

export default Grade;

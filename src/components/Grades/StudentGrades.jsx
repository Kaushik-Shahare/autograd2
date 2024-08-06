import axios from "axios";
import React, { useEffect } from "react";
import './Grades.css'; // Import your custom CSS file

function Grades() {
  const [grades, setGrades] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/grades/student", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setGrades(response.data.questions);
      })
      .catch((error) => {
        console.log("Get student grades error: ", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-white">Grades</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-700 px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Question
              </th>
              <th className="border border-gray-700 px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Grades
              </th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600 transition duration-300`}
              >
                <td className="border border-gray-700 py-4 text-sm text-white align-top whitespace-nowrap">
                  {grade.question}
                </td>
                <td className="border border-gray-700 px-4 py-4 text-sm text-white">
                  <ul className="list-disc pl-5 text-white">
                    {grade.grades.map((g) => (
                      <li key={g._id}>{g.grade}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;

import axios from "axios";
import React, { useEffect } from "react";

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Grades</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Question
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Grades
              </th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {grade.question}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  <ul className="list-disc pl-5">
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

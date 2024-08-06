const Grade = require("../models/Grade");
const Question = require("../models/Questions");

// const getAllGrades = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const question = await Question.findById(id).populate("grades");
//     res.status(200).json({ question });
//   } catch (error) {
//     console.log("Get all grades error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getGradeById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Grade ID is required" });
  }
  try {
    const grade = await Grade.findById(id);
    res.status(200).json({ grade });
  } catch (error) {
    console.log("Get grade by id error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrUpdateGrade = async (req, res) => {
  const { questionId, grade } = req.body;
  const studentId = req.userId;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const question = await Question.findById({ _id: questionId }).populate(
      "grades"
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingGrade = question.grades.find(
      (g) => g.studentId.toString() === studentId
    );
    if (existingGrade) {
      existingGrade.grade = grade;
      await existingGrade.save();
      return res.status(200).json({ message: "Grade updated", existingGrade });
    }

    const newGrade = new Grade({
      studentId,
      questionId,
      grade,
    });

    await newGrade.save();
    question.grades.push(newGrade);
    await question.save();
    res.status(201).json({ message: "Grade successfully created", newGrade });
  } catch (error) {
    console.log("Create grade error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { grade } = req.body;
  try {
    const grade1 = await Grade.findById(id);
    if (!grade1) {
      return res.status(404).json({ message: "Grade not found" });
    }
    grade1.grade = grade || grade1.grade;
    await grade1.save();

    res.status(200).json({ message: "Grade successfully updated", grade1 });
  } catch (error) {
    console.log("Update grade error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGrade = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Grade ID is required" });
  }
  try {
    await Grade.findByIdAndDelete(id);
    res.status(200).json({ message: "Grade successfully deleted" });
  } catch (error) {
    console.log("Delete grade error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const createGradeForAllUsers = async (req, res) => {
//   const { questionId, studentIds, grade } = req.body;
//   try {
//     // Ensure all required fields are provided
//     if (
//       !questionId ||
//       !studentIds ||
//       studentIds.length === 0 ||
//       grade === undefined
//     ) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Create a grade for each studentId
//     const gradePromises = studentIds.map((studentId) => {
//       const newGrade = new Grade({
//         questionId,
//         studentId,
//         grade,
//       });
//       return newGrade.save();
//     });

//     // Wait for all grades to be saved
//     await Promise.all(gradePromises);

//     res
//       .status(201)
//       .json({ message: "Grades successfully created for all users" });
//   } catch (error) {
//     console.log("Create grade for all users error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getStudentGrades = async (req, res) => {
  try {
    const userID = req.userId;

    const question = await Question.find().populate({
      path: "grades",
      match: { studentId: userID },
    });

    const questions = question
      .filter((question) => question.grades.length > 0)
      .map((question) => ({
        id: question._id,
        question: question.question,
        grades: question.grades,
      }));

    res.status(200).json({ questions });
  } catch (error) {
    console.log("Get student grades error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  // getAllGrades,
  getGradeById,
  createOrUpdateGrade,
  updateGrade,
  deleteGrade,
  getStudentGrades,
};

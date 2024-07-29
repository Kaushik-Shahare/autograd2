const Grade = require("../models/Grade");

const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("studentId")
      .populate("questionId");
    res.status(200).json({ grades });
  } catch (error) {
    console.log("Get all grades error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

const createGrade = async (req, res) => {
  const { questionId, studentId, grade } = req.body;
  try {
    const newGrade = new Grade({
      questionId,
      studentId,
      grade,
    });
    await newGrade.save();
    res.status(201).json({ message: "Grade successfully created" });
  } catch (error) {
    console.log("Create grade error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { questionId, studentId, grade } = req.body;
  try {
    await Grade.findByIdAndUpdate(id, {
      questionId,
      studentId,
      grade,
    });
    res.status(200).json({ message: "Grade successfully updated" });
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

const createGradeForAllUsers = async (req, res) => {
  const { questionId, studentIds, grade } = req.body;
  try {
    // Ensure all required fields are provided
    if (!questionId || !studentIds || studentIds.length === 0 || grade === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a grade for each studentId
    const gradePromises = studentIds.map(studentId => {
      const newGrade = new Grade({
        questionId,
        studentId,
        grade,
      });
      return newGrade.save();
    });

    // Wait for all grades to be saved
    await Promise.all(gradePromises);

    res.status(201).json({ message: "Grades successfully created for all users" });
  } catch (error) {
    console.log("Create grade for all users error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  createGradeForAllUsers
};

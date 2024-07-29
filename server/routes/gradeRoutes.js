const express = require("express");
const auth = require("../middlewares/auth");

const gradeRouter = express.Router();

const {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  createGradeForAllUsers,
} = require("../controllers/gradeController");

gradeRouter.get("/:id", auth, getAllGrades); // Get all grades of a question
gradeRouter.get("/grade/:id", auth, getGradeById); // Get grade by id
gradeRouter.post("/create", auth, createGrade);
gradeRouter.put("/update/:id", auth, updateGrade);
gradeRouter.delete("/delete/:id", auth, deleteGrade);
gradeRouter.post("/createForAllUsers", auth, createGradeForAllUsers);

module.exports = gradeRouter;

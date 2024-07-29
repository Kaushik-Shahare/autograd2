const express = require("express");

const gradeRouter = express.Router();

const {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  createGradeForAllUsers
} = require("../controllers/gradeController");

gradeRouter.get("/", getAllGrades);
gradeRouter.get("/:id", getGradeById);
gradeRouter.post("/create", createGrade);
gradeRouter.put("/update/:id", updateGrade);
gradeRouter.delete("/delete/:id", deleteGrade);
gradeRouter.post("/createForAllUsers", createGradeForAllUsers);

module.exports = gradeRouter;

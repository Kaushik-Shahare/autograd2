const express = require("express");
const auth = require("../middlewares/auth");
const userRouter = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers);
// userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/", auth,updateUser);
userRouter.delete("/", auth,deleteUser);

module.exports = userRouter;

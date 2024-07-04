const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.log("Get all users error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(id).select("-password");
//     res.status(200).json({ user });
//   } catch (error) {
//     console.log("Get user by id error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const createUser = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username,
      email,
      password,
      fullName,
    });
    await newUser.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.log("Create user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    await User.findByIdAndUpdate(id, { username, email, password, fullName });
    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    console.log("Update user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.log("Delete user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  // getUserById,
  createUser,
  updateUser,
  deleteUser,
};

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error while connecting to MongoDB", err);
  console.log("Exiting the process");
}

app.use("/api/auth", authRouter);
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
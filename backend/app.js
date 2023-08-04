const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://merntaskmanagerapp.onrender.com",
    ],
  })
);

//connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("data base connected"))
  .catch((err) => console.log(err));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

//envirement configurations
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
}

//create server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

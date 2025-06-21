const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// DB Connect + Start Server
mongoose.connect("mongodb://localhost:27017/taskmanager")
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.error(err));

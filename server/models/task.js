const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
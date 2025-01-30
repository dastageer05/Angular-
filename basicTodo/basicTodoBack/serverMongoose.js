const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/myTodos")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  todo: { type: String, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/gettodo", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/addtodo", async (req, res) => {
  const todoText = req.body.todo;
  const count = await Todo.countDocuments();
  const id = (count + 1).toString();

  const newTodo = new Todo({
    id,
    todo: todoText,
  });

  await newTodo.save();
  res.status(201).json({ message: "Created Successfully", id });
});

app.put("/edittodo", async (req, res) => {
  const { id, todo } = req.body;
  const result = await Todo.updateOne({ id }, { $set: { todo } });
  res.json({
    message:
      result.modifiedCount > 0 ? "Updated Successfully" : "Todo Not Found",
  });
});

app.delete("/deletetodo", async (req, res) => {
  const { id } = req.body;
  const result = await Todo.deleteOne({ id });
  res.json({
    message:
      result.deletedCount > 0 ? "Deleted Successfully" : "Todo Not Found",
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));

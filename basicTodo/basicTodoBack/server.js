const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

let todosCollection;

MongoClient.connect("mongodb://localhost:27017")
  .then((client) => {
    const db = client.db("myTodos");
    todosCollection = db.collection("todos");
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Get all todos
app.get("/gettodo", async (req, res) => {
  const todos = await todosCollection.find().toArray();
  res.json(todos);
});

app.post("/addtodo", async (req, res) => {
  const todo = req.body.todo;
  const count = await todosCollection.countDocuments();
  let id = (count + 1).toString();
  await todosCollection.insertOne({ id, todo });
  // res.status(201).send(id ? "Created Successfully" : "Creation Failed");
  res.status(201).json({ message: "Created Successfully", id });
});

app.put("/edittodo", async (req, res) => {
  const { id, todo } = req.body;
  const result = await todosCollection.updateOne({ id }, { $set: { todo } });
  res.json({
    message:
      result.modifiedCount > 0 ? "Updated Successfully" : "Todo Not Found",
  });
});

app.delete("/deletetodo", async (req, res) => {
  const { id } = req.body;
  const result = await todosCollection.deleteOne({ id });
  res.json({
    message:
      result.deletedCount > 0 ? "Deleted Successfully" : "Todo Not Found",
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));

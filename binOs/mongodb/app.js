const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");

connectToDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRoutes);

module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8020;
const app = express();
const connect = require("./Router");
// const url = process.env.MONGODB_URL;
MONGODB_URL =
  "mongodb+srv://cn9SBjwYqfgM9R1K:cn9SBjwYqfgM9R1K@hextech.b4abe.mongodb.net/HEROKUDB?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database is connected");
  });

app.get("/", (req, res) => {
  res.send("This is the landimg page of my blog api");
});

app.use(express.json());
app.use(cors());
app.use("/blog/api", connect);
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

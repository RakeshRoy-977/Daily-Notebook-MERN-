require("dotenv").config();
const express = require("express");
const connectTOdb = require("./Db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./R/auth"));
app.use("/api/notes", require("./R/Notes"));

connectTOdb();

app.listen(process.env.PORT, () =>
  console.log(`server is up at ${process.env.PORT}`)
);

const express = require("express");
const dbConnection = require("./utils/DBconnection");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(require("cors")());

app.listen(3000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});

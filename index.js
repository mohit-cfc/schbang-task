const authRoute = require("./routes/auth");
const courseRoute = require("./routes/course");

const express = require("express");
const dbConnection = require("./utils/DBconnection");
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(require("cors")());

const routePrefix = "api";

app.use(`/${routePrefix}`, authRoute);
app.use(`/${routePrefix}/courses`, courseRoute);

app.listen(port, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});

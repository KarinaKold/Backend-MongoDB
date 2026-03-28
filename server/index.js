require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");

const port = 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(async () => {
  try {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  } catch (error) {
    console.log(error);
  }
});

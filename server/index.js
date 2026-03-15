require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const { addUser, getUsers } = require("./controllers/users.controller");
const { loginOpetator } = require("./controllers/operators.controller");

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(auth);

app.get("/api/table", async (req, res) => {
  if (req.operator) {
    const users = await getUsers();
    res.json({ ok: true, data: users });
  } else {
    res.json({ ok: false });
  }
});

app.post("/api/form", async (req, res) => {
  await addUser(req.body);
});

app.post("/api/login", async (req, res) => {
  try {
    const token = await loginOpetator(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.json({ ok: true });
  } catch (err) {
    res.json({ ok: false });
  }
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(async () => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});

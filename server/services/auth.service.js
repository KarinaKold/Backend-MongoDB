const Operator = require("../models/Operator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

async function loginOpetator(email, password) {
  const operator = await Operator.findOne({ email });
  if (!operator) {
    throw new Error("Operator is not found");
  }

  const isPasswordCorrect = password === operator.password;
  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { loginOpetator };
const mongoose = require("mongoose");
const validator = require("validator");

const OperatorSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const Operator = mongoose.model("Operator", OperatorSchema);

module.exports = Operator;

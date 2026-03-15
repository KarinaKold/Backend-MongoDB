const User = require("../models/User");

async function addUser(patient) {
  const newUser = await User.create(patient);
  return newUser;
}

async function getUsers(search = "", limit = 10, page = 1) {
  const users = await User.find();
  return users;
}

module.exports = {
  addUser,
  getUsers,
};

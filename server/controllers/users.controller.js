const User = require("../models/User");

async function addUser(patient) {
  const newUser = await User.create(patient);
  return newUser;
}

async function getUsers(search = "", limit = 10, page = 1) {
  const users = await User.find();
  return users;
  // const [users, count] = await Promise.all([
  //   User.find({ name: { $regex: search, $options: "i" } })
  //     .limit(limit)
  //     .skip((page - 1) * limit)
  //     .sort({ createdAt: -1 }),
  //   User.countDocuments({ name: { $regex: search, $options: "i" } }),
  // ]);

  // return {
  //   users,
  //   lastPage: Math.ceil(count / limit),
  // };
}

module.exports = {
  addUser,
  getUsers,
};

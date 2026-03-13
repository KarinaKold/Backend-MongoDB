// add
const User = require("../models/Patient");

async function addUser(patient) {
  const newUser = await User.create(patient);
  return newUser;
}

// get patients with pagination and search
async function getUsers(search = "", limit = 10, page = 1) {
  const [users, count] = await Promise.all([
    User.find({ name: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    User.countDocuments({ name: { $regex: search, $options: "i" } }),
  ]);

  return {
    users,
    lastPage: Math.ceil(count / limit),
  };
}

module.exports = {
  addUser,
  getUsers,
};

const User = require("../models/User");

async function addUser(user) {
  try {
    const newUser = await User.create(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUsers(
  search = "",
  limit = 10,
  page = 1,
  sortBy = "createdAt",
  sortOrder = "desc",
) {
  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  const [users, count] = await Promise.all([
    User.find({ name: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort),
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

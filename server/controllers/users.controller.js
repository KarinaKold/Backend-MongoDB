const { addUser, getUsers } = require("../services/user.service");

async function add(req, res) {
  try {
    const user = await addUser(req.body);
    res.send({ error: null, data: user });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
}

async function getAll(req, res) {
  try {
    const { users, lastPage } = await getUsers(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.sortBy,
      req.query.sortOrder,
    );
    res.send({ error: null, data: { users, lastPage } });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
}

module.exports = {
  add,
  getAll,
};

const express = require("express");
const { addUser, getUsers } = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.post("/user", async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.send({ error: null, data: user });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.get("/list", auth, async (req, res) => {
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
});

module.exports = router;

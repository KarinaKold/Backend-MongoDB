const express = require("express");
const { add, getAll } = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.post("/user", add);
router.get("/list", auth, getAll);

module.exports = router;

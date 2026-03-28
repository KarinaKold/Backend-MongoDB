const express = require("express");
const { login, logout } = require("../controllers/operators.controller");

const router = express.Router({ mergeParams: true });

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;

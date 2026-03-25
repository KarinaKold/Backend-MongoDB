const express = require("express");
const { loginOpetator } = require("../controllers/operators.controller");

const router = express.Router({ mergeParams: true });

router.post("/login", async (req, res) => {
  try {
    const token = await loginOpetator(req.body.email, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: req.body.email });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token").send({});
});

module.exports = router;

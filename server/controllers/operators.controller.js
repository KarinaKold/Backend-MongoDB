const { loginOpetator } = require("../services/auth.service");

async function login(req, res) {
  try {
    const token = await loginOpetator(req.body.email, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: req.body.email });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
}

async function logout(req, res) {
  res.clearCookie("token").send({});
}

module.exports = { login, logout };

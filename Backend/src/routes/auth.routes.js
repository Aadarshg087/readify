const express = require("express");
const { googleLogin } = require("../controllers/auth.controller");

const authRouter = express.Router();

// "localhost:8000/auth"

authRouter.get("/test", () => {
  res.send("Hello from the Auth file");
});

authRouter.get("/google", googleLogin);

module.exports = authRouter;

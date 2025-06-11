const express = require("express");
const {
  getAllUsers,
  createUser,
  LoginUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/createUser", createUser);
userRouter.post("/loginUser", LoginUser);

module.exports = { userRouter };

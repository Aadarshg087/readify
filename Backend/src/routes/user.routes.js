const express = require("express");
const { getAllUsers, createUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/createUser", createUser);

module.exports = { userRouter };

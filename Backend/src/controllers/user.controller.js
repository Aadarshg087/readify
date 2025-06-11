// create user
// update user
// get all user (admin)
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");
const { logging } = require("googleapis/build/src/apis/logging");
const { looker } = require("googleapis/build/src/apis/looker");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find({}, "-email");
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in fetching all users", error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }
    const createdUser = await User.create({
      fullName,
      email,
      password,
    });
    const { _id } = createdUser;
    const token = await jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({ createdUser, token });
  } catch (error) {
    console.log(`Error in creating the account ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function LoginUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }
    const LoggedInUser = await User.findOne({ email });
    if (!LoggedInUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const userPassword = LoggedInUser.password;
    console.log(userPassword, " ", password);
    if (userPassword !== password) {
      return res.status(400).json({
        message: "Wrong Credentials",
      });
    }
    const { _id } = LoggedInUser;
    const token = await jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({ LoggedInUser, token });
  } catch (error) {
    console.log(`Error in creating the account ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = { getAllUsers, createUser, LoginUser };

// create user
// update user
// get all user (admin)

const User = require("../models/user.models");

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

    return res.status(200).json(createdUser);
  } catch (error) {
    console.log(`Error in creating the account ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = { getAllUsers, createUser };

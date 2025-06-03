const googleOAuthClient = require("../utils/googleConfig");
const axios = require("axios");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function googleLogin(req, res) {
  try {
    const { code } = req.query;
    console.log("code : ", code);
    console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

    const googleResponse = await googleOAuthClient.getToken(code);
    console.log(`Google Response: ${googleResponse.tokens}`);
    googleOAuthClient.setCredentials(googleResponse.tokens);
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
    );

    const { email, picture, name } = user.data;
    let isUser = await User.findOne({ email });
    if (!isUser) {
      isUser = await User.create({ email, fullName: name });
    }
    const { _id } = isUser;
    const token = await jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({ message: "Success", token, user: isUser });
  } catch (error) {
    // console.log("Error in logging the user", error);
    console.log(
      "Error in logging the user",
      error.response?.data || error.message
    );
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = { googleLogin };

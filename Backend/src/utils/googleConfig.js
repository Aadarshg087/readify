const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log(CLIENT_ID, " : ", CLIENT_SECRET);

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("🔴 FATAL ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not defined in environment variables. Check your .env file and its loading order.");
  // Optionally, throw an error to prevent the app from starting with misconfiguration
  // throw new Error("Missing Google OAuth credentials");
}

const googleOAuthClient = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "postmessage"
);

module.exports = googleOAuthClient;

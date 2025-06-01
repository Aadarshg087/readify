const mongoose = require("mongoose");

async function connectDB() {
  try {
    const instance = await mongoose.connect(`${process.env.MONGO_URI}/readify`);
    console.log(`Mongo is connected : ${instance.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to the DB: ${error}`);
    process.exit(1);
  }
}

module.exports = connectDB;

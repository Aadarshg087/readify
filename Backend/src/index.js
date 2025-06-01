// packages
const express = require("express");
const cors = require("cors");
const path = require("path");

// local function imports
const connectDB = require("./database/index");
const { userRouter } = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");

require("dotenv").config({
  path: ".env",
});
console.log(process.env.PORT);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CORS,
  })
);

connectDB()
  .then(() => {
    console.log(`Server is ready! 🚀`);
  })
  .catch(() => {
    console.log(`Some error occured in the server`);
  });

//   Routes
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT}...`);
});

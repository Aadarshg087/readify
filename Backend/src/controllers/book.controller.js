// add book
// remove book
// getAllBooks of a user
// change status
// need to implement the middleware to get the current user

const Book = require("../models/book.models");
const User = require("../models/user.models");

async function addBook(req, res) {
  try {
    const { bookTitle, status } = req.body;
    if (!bookTitle || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // const currUser = req.user; // middleware part
    const currUser = "rahul@gmail.com";
    if (!currUser) {
      return res.status(400).json({
        message: "User must be logged in",
      });
    }

    const currUserId = await User.findOne({ email: currUser });
    const entry = await Book.create({
      bookTitle,
      status,
      user: currUserId._id,
    });

    return res.status(200).json({ message: "Book added successfully", entry });
  } catch (error) {
    console.log(`Error in adding the book to the DB ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function getAllBooks(req, res) {
  try {
    const currUser = "rahul@gmail.com";
    const currUserId = await User.findOne(
      { email: currUser },
      { projection: { _id: 1 } }
    );

    const allBooks = await Book.find(
      { user: currUserId },
      { bookTitle: 1, status: 1, _id: 0 }
    );

    return res.status(200).json(allBooks);
  } catch (error) {
    console.log(`Erro in fetching the books ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = { addBook, getAllBooks };

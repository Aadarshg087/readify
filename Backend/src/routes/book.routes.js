const express = require("express");
const { addBook, getAllBooks } = require("../controllers/book.controller");

const bookRouter = express.Router();

bookRouter.get("/getAllBooks", getAllBooks);
bookRouter.post("/addBook", addBook);

module.exports = bookRouter;

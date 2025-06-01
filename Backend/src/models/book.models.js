const mongoose = require("mongoose");
const User = require("./user.models");

const bookSchema = mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Reading", "Finished", "In Queue"],
      default: "In Queue",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

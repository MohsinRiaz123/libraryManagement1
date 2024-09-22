const BookModel = require('../models/book');

const createBook = async (req, res) => {
    try {
        const book = new BookModel(req.body);
        await book.save();
        res.status(200).json({
            message: "Successfully added",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error adding book", error });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find();
        res.status(200).json({
            message: "Successfully displayed all books",
            books: books
        });
    } catch (error) {
        res.status(404).json({ message: "Error fetching books", error });
    }
};

const getBookWithId = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Successfully displayed",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error fetching book", error });
    }
};

const updateBookWithId = async (req, res) => {
    try {
        const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Successfully updated",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error updating book", error });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Successfully deleted",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error deleting book", error });
    }
};

const getBookWithTitle = async (req, res) => {
    try {
        const book = await BookModel.findOne({ title: req.params.title });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Successfully displayed book using title",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error fetching book", error });
    }
};

const getBookWithAuthor = async (req, res) => {
    try {
        const book = await BookModel.findOne({ author: req.params.author });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Successfully displayed book using author",
            book: book
        });
    } catch (error) {
        res.status(404).json({ message: "Error fetching book", error });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    updateBookWithId,
    getBookWithId,
    deleteBook,
    getBookWithTitle,
    getBookWithAuthor
};
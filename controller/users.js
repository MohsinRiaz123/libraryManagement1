const UserModel = require('../models/users');

const addUser = async (req, res, next) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(200).json({
            message: "Successfully added",
            user: user
        });
    } catch (error) {
        next(error)
    }
};




const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            message: "Successfully displayed all users",
            users: users
        });
    } catch (error) {
        next(error)
    }
};

const getUserWithId = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: `Successfully displayed user with id: ${req.params.id}`,
            user: user
        });
    } catch (error) {
        next(error)
    }
};
    
const updateUserWithId = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: `Successfully updated user with id: ${req.params.id}`,
            user: user
        });
    } catch (error) {
        next(error)
    }
};

const deleteUserWithId = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: `Successfully deleted user with id: ${req.params.id}`,
            user: user
        });
    } catch (error) {
        next(error)
    }
};

const borrowBook = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('borrowedBooks');
        const book = await BookModel.findById(req.params.bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or book not found' });
        }

        if (!book.available) {
            return res.status(400).json({ message: 'Book is not available for borrowing' });
        }

        user.borrowedBooks.push(book._id);
        book.available = false;
        await user.save();
        await book.save();
        console.log(borrowedBooks);
        // console.log(user);

        res.status(200).json({
            message: 'Successfully borrowed the book',
            book: book
        });
    } catch (error) {
        next(error)
    }
};

// Return a book
const returnBook = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('borrowedBooks');;
        const book = await BookModel.findById(req.params.bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or book not found' });
        }

        if (!user.borrowedBooks.includes(req.params.bookId)) {
            return res.status(400).json({ message: 'Book not borrowed by this user' });
        }

        user.borrowedBooks = user.borrowedBooks.filter(
            (bookId) => bookId.toString() !== req.params.bookId
        );
        book.available = true;
        await user.save();
        await book.save();

        res.status(200).json({
            message: 'Successfully returned the book',
            book: book
        });
    } catch (error) {
        next(error)
    }
};

// View borrowed books
const viewBorrowedBooks = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('borrowedBooks');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Successfully fetched borrowed books',
            borrowedBooks: user.borrowedBooks
        });
    } catch (error) {
        next(error)
    }
};


module.exports = {
    addUser,
    getUsers,
    getUserWithId,
    updateUserWithId,
    deleteUserWithId,
    borrowBook,
    returnBook,
    viewBorrowedBooks
};

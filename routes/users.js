const express = require('express')
const authMiddleware=require('../middleware/auth')
const router = express.Router()

const {
    addUser,
    getUsers,
    getUserWithId,
    updateUserWithId,
    deleteUserWithId,
    borrowBook,
    returnBook,
    viewBorrowedBooks } = require('../controller/users')


//add user

router.post('/add', addUser)

//get all users

router.get('/getUsers', getUsers)



//get user with id

router.get('/getUserwithID:id', getUserWithId)

//update user with id

router.put('/updateUser/:id', updateUserWithId)

//delete user with id

router.delete('/deleteUser/:id', deleteUserWithId)

// Borrow a book
router.post('/users/:id/borrow/:bookId', borrowBook,authMiddleware);

// Return a book
router.post('/users/:id/return/:bookId', returnBook,authMiddleware);

// View borrowed books
router.get('/users/:id/borrowedBooks', viewBorrowedBooks);

module.exports = router
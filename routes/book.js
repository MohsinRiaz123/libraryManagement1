const express = require('express')

const router = express.Router()

const {
    createBook,
    getAllBooks,
    getBookWithId,
    updateBookWithId,
    deleteBook,
    getBookWithTitle, getBookWithAuthor
} = require('../controller/book')

// add book 

router.post('/create', createBook)

// get all books

router.get('/create', getAllBooks)

// get book with id

router.get('/create/:id', getBookWithId)

// post (update) book with id

router.put('/create/:id', updateBookWithId)

// delete book with id

router.delete('/create/:id', deleteBook)


// get book with book title

router.get('/getbookfromtitle/:title', getBookWithTitle)

//get book with book author
router.get('/getbookfromauthor/:author', getBookWithAuthor)

module.exports = router
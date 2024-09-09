const express = require('express');
const router = express.Router();
const { addBook, getAllData, getById, updateById, deleteById }=require('../controller/book');
router.post('/book', addBook);
router.get('/book', getAllData);
router.get('/book:id', getById);
router.put('/book:id', updateById);
router.delete('/book:id', deleteById);

module.exports = router
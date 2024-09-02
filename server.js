const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const { Book } = require('./bookSchema');
const app = express();
const PORT = 3001;
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/books");

app.post('/book', (req, res) => {
    const userdata = new Book(req.body);
    userdata.save();
    res.send(userdata);
})
app.get('/book', async (req, res) => {
    const data = await Book.find();
    res.send(data);
})
app.get('/book/:id', async (req, res) => {
    const data = await Book.findById(req.params.id);
    res.send(data);
})
app.put('/book/:id', async (req, res) => {
    const data = await Book.findByIdAndUpdate(req.params.id,req.body);
    res.send(data);
})
app.delete('/book/:id', async (req, res) => {
    const data = await Book.findByIdAndDelete(req.params.id);
    res.send(data);
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
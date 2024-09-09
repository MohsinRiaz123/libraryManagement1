const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const bookRrouter=require('./routes/book');
const userRouter=require('./routes/users')
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/books");
app.use(bookRrouter);
app.use(userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
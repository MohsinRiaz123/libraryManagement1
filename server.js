const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRouter = require('./routes/users')
const bookRouter = require('./routes/book')
const authRouter=require('./routes/auth')



app.use(express.json())

const port = 3000

mongoose.connect('mongodb://localhost:27017/books')

app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'An error occurred!',
        error: err.message
    });
});

app.use('/user', userRouter)
app.use('/book', bookRouter)
app.use('/auth',authRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost${port}`)
})
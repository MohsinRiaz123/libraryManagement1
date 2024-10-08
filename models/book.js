const mongoose= require('mongoose')

const BookSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    },

    publishedYear:{
        type:Number,
        required:true
    },

    genre:{
        type:String,
        required:true
    },

    available:{
        type:Boolean,
        default:true
    }
})

const bookSchema=mongoose.model('book',BookSchema)

module.exports=bookSchema
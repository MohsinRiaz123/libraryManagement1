const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publishedYear:{
        type:Number,
        require:true,
    },
    genre:{
        type:String,
        require:true
    },
    available:{
        type:Boolean,
        default:true,
    },

});
exports.Book=mongoose.model('Book',bookSchema);
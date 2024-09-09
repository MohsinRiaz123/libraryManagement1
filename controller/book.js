const {Book}=require('../models/book')
const addBook=(req, res) => {
    const userdata = new Book(req.body);
    userdata.save();
    res.send(userdata);
}
const getAllData=async(req, res) => {
    const data = await Book.find();
    res.send(data);
}
const getById=async(req, res) => {
    const id=req.params.id;
    const data = await Book.findById(id);
    res.send(data);
}
const updateById=async(req, res) => {
    const data = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(data);
}
const deleteById=async (req, res) => {
    const data = await Book.findByIdAndDelete(req.params.id);
    res.send(data);
}
module.exports={addBook,getAllData,getById,updateById,deleteById};
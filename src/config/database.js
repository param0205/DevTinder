const mongoose = require("mongoose");

const connectDB  = async()=>{
  await mongoose.connect("mongodb+srv://param020599:W5ornzpfxtslS9bg@devtinder.n5tva.mongodb.net/devTinder");
}


module.exports = connectDB;




const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   name: String,
   email: {
      type: String, 
      required: true, 
      lowercase: true, 
      unique: true
   },
   password: {
      type: String,
      required: true,
   }
 }, {
   timestamps: true
 });
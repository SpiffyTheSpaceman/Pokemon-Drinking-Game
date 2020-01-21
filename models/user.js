const mongoose = require('mongoose')
//To perform the actual salting and hashing whenever a user instance is being saved and the password has changed.
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

//bcrypt has a setting that tells it how many times to randomize the generation of salt. Let's add a constant in the module to set it - usually 6 is enough:
const SALT_ROUNDS = 6;


//NOTE: in order to reduce clutter on the JSON web token, it is best to keep the user document to a minimum in terms of data. Any reference ids and stuff like that should be put on the other models instead.
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

 userSchema.methods.comparePassword = function(tryPassword, cb) {
   // this refers to the user model we are comparing in user.comparePasswords
   // bcrypt.compare will compare the unencrypted password with the encrypted password in the database.
   // NOTE: bcrypt's compare method is written as an asynchronous method, thus the necessity to provide a callback
   bcrypt.compare(tryPassword, this.password, cb);
 };


 //schema.set(option, value):
 //Schemas have a few configurable options which can be set directly.
 userSchema.set('toJSON', {
    //mongoose will call this function whenever toJSON is called and allow you to transform the returned object. toJSON would be called whenever it is passed to the database automatically since we have to pass JSON over the web.
   transform: function(doc, ret) {
     // remove the password property when serializing doc to JSON (sent to browser)
     delete ret.password;
     return ret;
   }
 });
 


//runs before a user is saved. This is called pre middleware, also known as a "hook".
 userSchema.pre('save', function(next) {
   // assigning this (the user document being saved) to a variable. The reason is that we will need to access this user doc from within the bcrypt.hash() method's callback
   const user = this;
   if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
   bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
      if (err) return next(err);
      // replace the user provided password with the hash (encrypted password)
      // in the database, password will now be some random encrypted string instead of their actual password in clear text.
      user.password = hash;
      // Need to add next so it goes to the next set of middleware.
      next();
   });
 });

 module.exports = mongoose.model('User', userSchema);
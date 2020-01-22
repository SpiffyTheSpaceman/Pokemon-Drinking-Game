const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const playerSchema = new Schema({
   initials: String,
   squareNum: Number,
})

const gameSchema = new Schema({
  keyCode: String,
  players: [playerSchema],
  owner: String,
  board: String,
  finalSquare: Number
}, {
  timestamps: true
});

//Subdocuments have save and validate middleware just like top-level documents. Calling save() on the parent document triggers the save() middleware for all its subdocuments, and the same for validate() middleware.
playerSchema.pre('save', function(next) {
   this.initials = this.initials.substr(0, 3).toUpperCase();
   next();
 });

module.exports = mongoose.model('Game', gameSchema);
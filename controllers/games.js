//NOTE: 'res.whatever' is the same as 'return res.whatever' but the return just makes sure that the rest of the function doesn't run.

var Game = require('../models/game');

module.exports = {
  create,
  myGames,
};

async function create(req, res) {
   
   if (req.user) req.body.owner = req.user._id;
   const game = new Game(req.body);
   try {
      //Note, i don't use Game.create(req.body) because I need to get the returned game object.
     await game.save(req.body);
     // Return the game object to the person.
     res.json(game);
   } catch (err) {
      //if error, (propbably game name already exists), return error.
      res.status(400).json(err);
   }
}

async function myGames(req, res) {
   const games = await Game.find({owner: req.user._id})
     .sort({createdAt: -1})
     // Default to a limit of 20 high scores
     // if not specified in a query string
    console.log(games);
   res.json(games);
 }
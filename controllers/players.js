const Game = require('../models/game');

module.exports = {
   create,
   // delete
}

async function create(req, res) {
   let gameId = req.get('Game');
   try {
      const game = await Game.findById(gameId);
      game.players.push(req.body);
      await game.save();
      res.json(game);
   }
   catch(err) {
      res.status(400).json(err);
   }
}
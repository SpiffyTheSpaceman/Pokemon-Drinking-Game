const Game = require('../models/game');

module.exports = {
   create,
   delete: deletePlayer,
   update,
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

async function deletePlayer(req, res) {

   try {
      const game = await Game.findById(req.body.gameId);
      game.players.splice(req.body.index, 1);
      await game.save();
      res.json(game);
   }
   catch(err) {
      res.status(400).json(err);
   }
}

async function update(req, res) {

   try {
      const game = await Game.findById(req.params.id);
      Object.assign(game.players[req.params.index], req.body);
      await game.save();
      res.json(game);
   }
   catch(err) {
      res.status(400).json(err);
   }
}
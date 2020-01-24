const express = require('express');
const router = express.Router();
const playersCtrl = require('../../controllers/players');

router.post('/pokemon-game/players', playersCtrl.create)


module.exports = router;


const express = require('express');
const router = express.Router();
const playersCtrl = require('../../controllers/players');

router.post('/pokemon-game/players', playersCtrl.create)
router.delete('/pokemon-game/players', playersCtrl.delete)


module.exports = router;


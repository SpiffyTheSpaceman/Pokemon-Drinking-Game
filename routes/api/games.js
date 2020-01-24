const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/games');
const addReqUserFromToken = require('../../config/auth');


/*---------- Protected Routes ----------*/
// Process the token for only the routes below
// router.use will run the addReqUserFromToken function first which will add the user to req to have the req.user property.
router.use(addReqUserFromToken);
router.get('/my-games', gamesCtrl.myGames);
router.post('/pokemon-game', gamesCtrl.create);

module.exports = router;


/*----- Helper Functions -----*/
// checkAuth takes advantage of the req.user property that is now on the protected routes. This middleware requires that a req.user exists for the next middleware to run.
function checkAuth(req, res, next) {
   if (req.user) return next();
   return res.status(401).json({msg: 'Not Authorized'});
}
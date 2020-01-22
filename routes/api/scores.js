const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');
const requireAuth = require('../../config/auth');

router.get('/', scoresCtrl.highScores);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
// router.use will run the requireAuth function first which will add the user to req to have the req.user property.
router.use(requireAuth);
router.post('/', checkAuth, scoresCtrl.create);

module.exports = router;


/*----- Helper Functions -----*/
// checkAuth takes advantage of the req.user property that is now on the protected routes. This middleware requires that a req.user exists for the next middleware to run.
function checkAuth(req, res, next) {
   if (req.user) return next();
   return res.status(401).json({msg: 'Not Authorized'});
 }
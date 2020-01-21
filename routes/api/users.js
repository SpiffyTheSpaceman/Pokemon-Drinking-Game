const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
//NOTE: routes start at /api in react by standard and is in the api folder since in react, get routing is done client side and all we really do is just fetch or push data to the api instead of actually dealing with url paths and rendering url based on paths.
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;
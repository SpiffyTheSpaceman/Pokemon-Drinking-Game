const express = require('express');

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

//If we weren't using socket, we wouldn't need to do this and could just stick with using app, but for some reason, socket requires a http, NOTE: look into later? 
const server = require('http').Server(app);
// Method 1 (they do the same thing, just reorganized into another io.js file)
const io = require('./io');
io.attach(server);

// Method 2
// var io = require('socket.io')(server);
// io.on('connection', function (socket) {
//   console.log('Client connected to socket.io!');
// });

require('dotenv').config();
require('./config/database');



app.use(logger('dev'));
//handles attaching data to req.body
app.use(express.json());
// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/games', require('./routes/api/games'));
app.use('/api/scores', require('./routes/api/scores'));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

// app is the express project, but the http is required for socket, so use server.listen instead. It will also connect the express app to the port as well so don't worry about it.
// app.listen(port, function() {
//    console.log(`Express app running on port ${port}`);
// });

server.listen(port);


// const server = require('http').Server(app);
// // Method 1 (they do the same thing, just reorganized into another io.js file)
// const io = require('./io');
// io.attach(server);
// // Method 2
// // var io = require('socket.io')(server);
// // io.on('connection', function (socket) {
// //   console.log('Client connected to socket.io!');
// // });
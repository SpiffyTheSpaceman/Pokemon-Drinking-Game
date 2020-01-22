import io from 'socket.io-client';

//NOTE: io takes in a url/port for the socket to listen to. If empty, it listens to the user's port that the web app is currently on.
const socket = io();

socket.on('move-player', function (data) {
   console.log(data);
});

export default socket;
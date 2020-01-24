//NOTE: 'res.whatever' is the same as 'return res.whatever' but the return just makes sure that the rest of the function doesn't run.
import tokenService from './tokenService';

export default {
   getMyGames,
   create,
   addPlayer,
   deletePlayer,
   updatePlayer,
 };

const BASE_URL = '/api/games/';

function getMyGames() {
   const options = {
     method: 'GET',
     headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()}),
   };
   return fetch(BASE_URL + 'my-games', options).then(res => res.json());
 }


function create(payload) {
   const newGame = {
      keyCode: payload.keyCode,
      players: [],
      owner: '',
      board: payload.board,
   }

   return fetch(BASE_URL + 'pokemon-game', {
     method: 'POST',
     headers: new Headers({'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
   }),
     body: JSON.stringify(newGame)
   }) //post triggers our route, then our controller (storing the above data as req.method, req.headers, req.body). We coded our controller to res.json(game) so that it will respond with the game object into our res object or an error.
   .then(res => {
      // if controller did not respond with an error, return the game object (which is our res).
     if (res.ok) return res.json();
     // Probably a duplicate game name, return error
     throw new Error('Game Name already taken!');
   })
 }


 function addPlayer(payload) {
  const player = {
    initials: payload.initials,
    squareNum: payload.squareNum
  }
   return fetch(BASE_URL + 'pokemon-game/players', {
     method: 'POST',
     headers: new Headers({'Content-Type': 'application/json',
     'Game': payload.id,
   }),
     body: JSON.stringify(player)
   }) //post triggers our route, then our controller (storing the above data as req.method, req.headers, req.body). We coded our controller to res.json(game) so that it will respond with the game object into our res object or an error.
   .then(res => {
      // if controller did not respond with an error, return the game object (which is our res).
     if (res.ok) return res.json();
     // Probably a duplicate game name, return error
     throw new Error('Game Name already taken!');
   })
 }

 function deletePlayer(payload) {
   return fetch(BASE_URL + 'pokemon-game/players', {
     method: 'DELETE',
     headers: new Headers({'Content-Type': 'application/json'
   }),
     body: JSON.stringify(payload)
   }) //post triggers our route, then our controller (storing the above data as req.method, req.headers, req.body). We coded our controller to res.json(game) so that it will respond with the game object into our res object or an error.
   .then(res => {
      // if controller did not respond with an error, return the game object (which is our res).
     if (res.ok) return res.json();
     // Probably a duplicate game name, return error
     throw new Error('Hmm error.');
   })
 }

 function updatePlayer(payload) {
  return fetch(BASE_URL + 'pokemon-game/' + payload.id + '/players/' + payload.index, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'
  }),
    body: JSON.stringify(payload.player)
  }) //post triggers our route, then our controller (storing the above data as req.method, req.headers, req.body). We coded our controller to res.json(game) so that it will respond with the game object into our res object or an error.
  .then(res => {
     // if controller did not respond with an error, return the game object (which is our res).
    if (res.ok) return res.json();
    // Probably a duplicate game name, return error
    throw new Error('Hmm error.');
  })
}

//NOTE HOW TO USE IN THE COMPONENT: 
//const game = await gamesService.index(); OR
//const game = await gamesService.create();
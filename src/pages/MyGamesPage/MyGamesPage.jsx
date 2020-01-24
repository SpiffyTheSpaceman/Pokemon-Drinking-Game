import React, {useState, useEffect} from 'react';
import gameService from '../../utils/gameService';
import './MyGamesPage.css';

export default function() {
   const [myGames, setMyGames] = useState([])
   
   useEffect( () => {
      let games = []
      async function fetchGames() {
         games = await gameService.getMyGames();
         setMyGames(games);
      }
      fetchGames()
      console.log(games)
   }, [])

   return(
      <div className="MyGamesPage">
         {myGames.map( (game, index) => {
            return (
               <div key={index} className="myGames-card">
                  <p>Game Name: {game.keyCode}</p>
                  <p># Players: {game.players.length}</p>
               </div>
            )
         } )}
      </div>
   )
}
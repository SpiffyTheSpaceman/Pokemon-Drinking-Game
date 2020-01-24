import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
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
                  <NavLink 
                     to={{
                        pathname: '/pokemon-game',
                        state: { gameData: game },
                     }}
                     exact
                     className="myGames-card" 
                     key={index}
                     >
                     <p>Game Name: {game.keyCode}</p>
                     <p># Players: {game.players.length}</p>
                  </NavLink>
            )
         } )}
      </div>
   )
}
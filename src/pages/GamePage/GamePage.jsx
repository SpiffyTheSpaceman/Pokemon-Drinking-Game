import React, {useState} from 'react';
import socket from '../../utils/io';
import GameNameModal from '../../components/GameNameModal/GameNameModal';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import './GamePage.css';
import gameService from '../../utils/gameService';

export default function GamePage(props) {
   // props.location.state.keyCode


   const [active, setActive] = useState(
      (!!props.location.state && !!props.location.state.keyCode) ? false : true
         );
   const [keyCode, setKeyCode] = useState(
      (!!props.location.state && !!props.location.state.keyCode) ? props.location.state.keyCode : ''
      );
   // if props.location.state.keyCode exists, the gamedata initial value should be a get request.
   const [gameData, setGameData] = useState({});
   const [players, setPlayers] = useState([]);

   function handleActivate() {
      setActive(false);
   }

   async function handleAddPlayer(player) {
      const payload = {
         id: gameData._id,
         initials: player,
         squareNum: 0,
      }
      let playersCopy = [...players]
      playersCopy[playersCopy.length-1].initials = player;
      setPlayers(playersCopy)
      const newGameData = await gameService.addPlayer(payload);
      setGameData(newGameData);
   }

   function handleAddPlayerForm() {
      let playersCopy = [...players];
      playersCopy.push({
         initials: '',
         squareNum: 0,
      })
      setPlayers(playersCopy);
   }

   function handleCancel() {
      let playersCopy = [...players];
      playersCopy.pop();
      setPlayers(playersCopy);
   }


   // if (props.location.state.keyCode) {

   // }

   console.log(socket);
   return(
      <div className="GamePage" >
         <GameNameModal 
         active={active} 
         handleActivate={handleActivate} 
         keyCode={keyCode}
         handleKeyCodeChange={setKeyCode}
         setGameData={setGameData}
         />
         <div className="PlayerCardContainer">
         <p style={{margin: 0, padding: 0, marginBottom: '20px'}}>{gameData.keyCode}</p>
            {players.map( (player, index) =>
               <PlayerCard key={index} player={player} 
               handleCancel={handleCancel}
               handleAddPlayer={handleAddPlayer}/>  
            )}
            <button 
            className="addForm"
            onClick={handleAddPlayerForm}
            disabled={players.length && !players[players.length-1].initials}
            >+ Add Player</button>
         </div>
      </div>
   )
}
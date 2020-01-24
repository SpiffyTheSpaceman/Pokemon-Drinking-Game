import React, {useState} from 'react';
import socket from '../../utils/io';
import GameNameModal from '../../components/GameNameModal/GameNameModal';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import './GamePage.css';
import gameService from '../../utils/gameService';
import GameBoard from'../../components/GameBoard/GameBoard';
import DiceRoller from '../../components/DiceRoller/DiceRoller';

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
   const [turn, setTurn] = useState(0)

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

   async function handleRemovePlayer(index) {
      let playersCopy = [...players]
      playersCopy.splice(index, 1);
      setPlayers(playersCopy);
      const newGameData = await gameService.deletePlayer({
         gameId: gameData._id,   
         index
      });
      setGameData(newGameData)
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

   async function handleMovePlayer(value) {
      if (players.length === 0) return;
      let playersCopy = [...players];
      playersCopy[turn].squareNum += value;
      setPlayers(playersCopy);
      const payload = {
         index: turn,
         id: gameData._id,
         player: playersCopy[turn],
      };
      if (turn >= players.length - 1) {
         setTurn(0);
         return;
      }
      setTurn(turn + 1);
      const newGameData = await gameService.updatePlayer(payload);
      setGameData(newGameData);
   }

   function createMoveButtons() {
      const values = [1, 2, 3, 4, 5, 6];
      return (
         values.map( (value, index) => (
          <div 
          className="button move-button"
          key={value}
          onClick={() => handleMovePlayer(value)}
          >{value}</div>  
         ))
      )
   }


   // if (props.location.state.keyCode) {

   // }

   // console.log(socket);
   return(
      <div className="GamePage" >
         <div className="GamePageBackground"></div>
         <GameNameModal 
         active={active} 
         handleActivate={handleActivate} 
         keyCode={keyCode}
         handleKeyCodeChange={setKeyCode}
         setGameData={setGameData}
         />
         <GameBoard />
         <div className="GamePage-aside">
            <div className="PlayerCardContainer">
               <p style={{margin: 0, padding: 0, marginBottom: '20px'}}>{gameData.keyCode}</p>
               {players.map( (player, index) =>
                  <PlayerCard key={index} 
                  player={player}
                  index={index}
                  turn={turn} 
                  handleCancel={handleCancel}
                  handleAddPlayer={handleAddPlayer}
                  handleRemovePlayer={handleRemovePlayer}
                  />  
               )}
               <button 
               className="addForm"
               onClick={handleAddPlayerForm}
               disabled={players.length && !players[players.length-1].initials}
               >+ Add Player</button>
            </div>
            <div className="MoveCardContainer">
               <DiceRoller />
               {createMoveButtons()}
            </div>
         </div>
      </div>
   )
}
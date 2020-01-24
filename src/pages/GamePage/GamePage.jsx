import React, {useState} from 'react';
import socket from '../../utils/io';
import GameNameModal from '../../components/GameNameModal/GameNameModal';
import './GamePage.css';

export default function GamePage(props) {
   // props.location.state.keyCode


   const [active, setActive] = useState(props.location.state.keyCode ? false : true);
   const [keyCode, setKeyCode] = useState(props.location.state.keyCode ? props.location.state.keyCode : '');
   // if props.location.state.keyCode exists, the gamedata initial value should be a get request.
   const [gameData, setGameData] = useState({});

   function handleActivate() {
      setActive(false);
   }


   if (props.location.state.keyCode) {

   }

   console.log(socket);
   return(
      <div className="GamePage" >
         <p style={{marginTop: '500px'}}>{gameData.keyCode}</p>
         <GameNameModal 
         active={active} 
         handleActivate={handleActivate} 
         keyCode={keyCode}
         handleKeyCodeChange={setKeyCode}
         setGameData={setGameData}
         />

      </div>
   )
}
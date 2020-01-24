import React, {useState} from 'react';
import './DiceRoller.css';


export default function PlayerCard(props) {

   const [value, setValue] = useState(1);

   function handleClick() {
       const roll = Math.floor(Math.random()* 6 + 1)
       setValue(roll);
   }

   return (
      <div className="DiceRoller">
         <div className="diceContainer" onClick={() => handleClick()}>
            Generate<br />Random<br />Number
         </div>
         <div>
            {value}
         </div>
      </div>
   )
}
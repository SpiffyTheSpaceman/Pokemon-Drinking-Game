import React, {useState} from 'react';
import classNames from 'classnames';
import './PlayerCard.css';


export default function PlayerCard(props) {

   const [initials, setInitials] = useState('');

   function handleChange(e) {
      e.preventDefault();
      setInitials(e.target.value);
   }

   function handleCancel(e) {
      e.preventDefault();
      props.handleCancel();
   }

   function handleRemovePlayer(e) {
      e.preventDefault();
      props.handleRemovePlayer();
   }

   async function handleSubmit(e) {
      e.preventDefault();
      props.handleAddPlayer(initials)
   }

   return (
      <>
      {props.player.initials ? 
         <div
         className={classNames({
            playerCard: true,
            currentTurn: props.turn === props.index,
         })}
         >
            {props.player.initials}<br/>
             Square #: {props.player.squareNum}
            <input type="button" onClick={handleRemovePlayer} value="x"/>
         </div>
         :
         <form onSubmit={handleSubmit} class="playerCard">
            <input 
               type="text" 
               placeholder="Initials" 
               value={initials} 
               name="gameName" 
               maxLength={3}
               onChange={handleChange}
            />
            <div>
               <input type="button" onClick={handleCancel} value="x"/>
               <button>+</button>
            </div>
         </form>
      }
      </>
   )
}
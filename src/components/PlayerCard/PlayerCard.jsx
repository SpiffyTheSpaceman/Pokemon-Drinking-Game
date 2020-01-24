import React, {useState} from 'react';
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

   async function handleSubmit(e) {
      e.preventDefault();
      props.handleAddPlayer(initials)
   }

   return (
      <>
      {props.player.initials ? 
         <div class="playerCard">
            {props.player.initials}
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
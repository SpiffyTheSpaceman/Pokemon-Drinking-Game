import React, {useState, useEffect} from 'react';
import styles from './GameNameModal.module.css';
import classNames from 'classnames';
import pokeball from '../../assets/images/Pokeball.svg';
import gameService from '../../utils/gameService';


export default function GameNameModal(props) {

   
   const [modalTransitioning, setModalTransitioning] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);   

   const [errorMessage, setErrorMessage] = useState('');

   useEffect(function() {
      if (props.active) {
         setModalTransitioning(true);
         setModalOpen(true);
         setTimeout( () => {
            setModalTransitioning(false);
         }, 300)
      } else if (!props.active) {
         setModalTransitioning(true);
         setModalOpen(false);
         setTimeout( () => {
            setModalTransitioning(false);
         }, 300 )
      }
      return;
   }, [props.active])


   function handleChange(e, changeState) {
      e.preventDefault();
      changeState(e.target.value);
   }

   function isFormInvalid() {
      return !(props.keyCode);
   }

   async function handleSubmit(e) {
      e.preventDefault();
      if (!props.active) return;
      const payload = {
         keyCode: props.keyCode,
         board: 'pokemon',
      }
      try {
         // Update to call login instead of signup
         // Note: since gameService.create returns a promise, we can use await.
         const gameData = await gameService.create(payload);
         props.setGameData(gameData);
         props.handleActivate();

       } catch (err) {
          // err is passed to us by gameService.create when it throws error.
         setErrorMessage(err.message);
         return;
       }

   }


   return(
      <div 
      style={{zIndex: (modalTransitioning || modalOpen) ? 11 : -3}} 
      className={styles.modalContainer}
      >
         <div 
         className={classNames({
            [styles.modalCardContainer]: true,
            [styles.modalOpen]: modalOpen,
         })} >
            <h1>
               Game Name
            </h1>
            <form 
            className="form"
            style={{justifyContent: 'center'}}
            onSubmit={handleSubmit}
            >
               <table 
               className="form-input-container"
               >
                  <tbody>
                     <tr>
                        <td><input 
                           type="text" 
                           placeholder="Game Name" 
                           value={props.keyCode} 
                           name="gameName" 
                           onChange={ (e) => handleChange(e, props.handleKeyCodeChange)}
                        /></td>
                     </tr>
                     <tr className={styles.error}>
                        <td>{errorMessage}</td>
                     </tr>
                  </tbody>
               </table>
               <button 
                  className={classNames({
                     [styles.submit]: true,
                     [styles.submitEnabled]: !isFormInvalid(),
                  })}
                  disabled={isFormInvalid()}
               >
                  <img 
                  className="pokeball"
                  src={pokeball}
                  alt='pokeball'
                  />
                  <span>Sign In</span>
               </button>
            </form>
         </div>

         <div 
            className={classNames({
               [styles.modalBackground]: true,
               [styles.backgroundActive]: props.active,
            })}
            >
         </div>
      </div>
   )

}

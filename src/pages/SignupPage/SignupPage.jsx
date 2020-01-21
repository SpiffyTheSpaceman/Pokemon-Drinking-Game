import React, {useState, useEffect} from 'react';
import styles from './SignupPage.module.css';
import classNames from 'classnames';
import pokeball from '../../assets/images/Pokeball.svg';


export default function SignupPage(props) {


   
   const [modalTransitioning, setModalTransitioning] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);   

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
               Pokemon Trainer<br />Sign Up
            </h1>
            <form 
            className="form"
            >
               <table 
               className="form-input-container"
               >
                  <tr>
                     <td className="min">Email:</td>
                     <td><input /></td>
                  </tr>
                  <tr>
                     <td className="min">Password:</td>
                     <td><input /></td>
                  </tr>
               </table>
               <button className={styles.submit}>
                  <img 
                  className="pokeball"
                  objectFit="contain"
                  src={pokeball}
                  alt='pokeball'
                  />
                  <span>Sign Up</span>
               </button>
            </form>
         </div>

         <div 
            className={classNames({
               [styles.modalBackground]: true,
               [styles.backgroundActive]: props.active,
            })}
            onClick={() => props.handleBackgroundClick()}
            >
         </div>
      </div>
   )

}
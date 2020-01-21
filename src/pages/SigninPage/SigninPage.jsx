import React, {useState, useEffect} from 'react';
import styles from './SigninPage.module.css';
import classNames from 'classnames';
import pokeball from '../../assets/images/Pokeball.svg'


export default function SigninPage(props) {

   
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


   function handleChange(e, changeState) {
      changeState(e.target.value);
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
               Pokemon Trainer<br />Sign In
            </h1>
            <form 
            className="form"
            onSubmit={props.handleSubmit}
            >
               <table 
               className="form-input-container"
               >
                  <tbody>
                     <tr>
                        <td className="min">Email:</td>
                        <td><input 
                           type="text" 
                           placeholder="Email" 
                           value={props.signinEmail} 
                           name="email" 
                           onChange={ (e) => handleChange(e, props.handleEmailChange)}
                        /></td>
                     </tr>
                     <tr>
                        <td className="min">Password:</td>
                        <td><input 
                           type="password" 
                           placeholder="Password" 
                           value={props.signinPassword} 
                           name="password" 
                           onChange={ (e) => handleChange(e, props.handlePasswordChange)}
                        /></td>
                     </tr>
                  </tbody>
               </table>
               <button className={styles.submit}>
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
            onClick={() => props.handleBackgroundClick()}
            >
         </div>
      </div>
   )

}

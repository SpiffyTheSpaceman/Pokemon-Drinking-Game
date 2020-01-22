import React, {useState, useEffect} from 'react';
import styles from './SignupPage.module.css';
import classNames from 'classnames';
import pokeball from '../../assets/images/Pokeball.svg';
import userService from '../../utils/userService';


export default function SignupPage(props) {
   
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
      return !(props.signupEmail && props.signupName && props.signupPassword && props.signupPassword2 && props.signupPassword === props.signupPassword2);
   }

   async function handleSubmit(e) {
      e.preventDefault();
      const payload = {
         name: props.signupName,
         email: props.signupEmail,
         password: props.signupPassword,
      }
      setErrorMessage('');
      try {
         //Note: since userService.signup returns a promise, we can use await.
         await userService.signup(payload);
         // Successfully signed up - deactivate modal.
         props.handleActivate();
         // Reset the states for all the fields since successful login.
         props.handleEmailChange('');
         props.handleNameChange('');
         props.handlePasswordChange('');
         props.handlePassword2Change('');
         // All this does is in <App> it sets the user state by getting it via the userService.get function which will retrieve the token that was just set by sign up
         props.handleSignupOrLogin();
       } catch (err) {
         // Invalid user data (probably duplicate email)
         // err is passed to us by userService.signup when it throws error.
         setErrorMessage(err.message);
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
               Pokemon Trainer<br />Sign Up
            </h1>
            <form 
               className="form"
               onSubmit={handleSubmit}
            >
               <table 
               className="form-input-container"
               >
                  <tbody>
                     <tr>
                        <td className="min">Email:</td>
                        <td><input 
                           type="email" 
                           placeholder="Email*" 
                           value={props.signupEmail} 
                           name="email" 
                           onChange={ (e) => handleChange(e, props.handleEmailChange)}
                        /></td>
                     </tr>
                     <tr>
                        <td className="min">Name:</td>
                        <td><input 
                           type="text" 
                           placeholder="Name*" 
                           value={props.signupName} 
                           name="name" 
                           onChange={ (e) => handleChange(e, props.handleNameChange)}
                        /></td>
                     </tr>
                     <tr>
                        <td className="min">Password:</td>
                        <td><input 
                           type="password" 
                           placeholder="Password*" 
                           value={props.signupPassword} 
                           name="password" 
                           onChange={ (e) => handleChange(e, props.handlePasswordChange)}
                        /></td>
                     </tr>
                     <tr>
                        <td className="min">Confirm Password:</td>
                        <td><input 
                           type="password" 
                           placeholder="Confirm Password*" 
                           value={props.signupPassword2} 
                           name="password2" 
                           onChange={ (e) => handleChange(e, props.handlePassword2Change)}
                        /></td>
                     </tr>
                     <tr className={styles.error}>
                        <td colSpan="2">{errorMessage}</td>
                     </tr>
                  </tbody>
               </table>
               <button 
                  className={classNames({
                     [styles.submit]: true,
                     [styles.submitEnabled]: !isFormInvalid(),
                     })
                  }
                  disabled={isFormInvalid()}
               >
                  <img 
                  className="pokeball"
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
            onClick={() => props.handleActivate()}
            >
         </div>
      </div>
   )

}
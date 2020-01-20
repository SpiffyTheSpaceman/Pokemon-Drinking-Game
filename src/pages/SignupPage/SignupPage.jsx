import React, {useState, useEffect} from 'react';
import './SignupPage.css';
import classNames from 'classnames';


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
      className="Signup-container"
      >
         <div 
         className={classNames({
            'Signup-card-container': true,
            modalOpen: modalOpen,
         })} >
            
         </div>

         <div 
            className={classNames({
               'Signup-background': true,
               backgroundActive: props.active,
            })}
            onClick={() => props.handleBackgroundClick()}
            >
         </div>
      </div>
   )

}

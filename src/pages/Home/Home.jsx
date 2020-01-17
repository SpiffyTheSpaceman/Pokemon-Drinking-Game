import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Logo from '../../assets/images/PokemonLogo.svg';
import Beer from '../../assets/images/Beer.svg';
import Wave from '../../components/Wave/Wave';
import Bubbles from '../../components/Bubbles/Bubbles';


export default function Home(props) {


   return(
      <div className="Home-background">
         <img 
            src={Logo} 
            alt="" 
            className="Home-logo"
            />;
         <p className="Home-subtitle">Drinking Game</p>
         <Wave />
         <Bubbles />
         <img src={Beer} className="beer" alt=""/>
         <img src={Beer} className="beer1" alt=""/>

      </div>
   )

}

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Logo from '../../assets/images/PokemonLogo.svg';
import Beer from '../../assets/images/Beer.svg';
import Wave from '../../components/Wave/Wave';
import Bubbles from '../../components/Bubbles/Bubbles';
import Audio from '../../components/Audio/Audio';
import AudioUrl from '../../assets/audio/Pokemon8Bit.mp3';
import Pikachu from '../../assets/images/drunkPikachu.png';


export default function Home(props) {

   const [changingPage, setChangingPage] = useState(false)

   function handleClick() {
      setChangingPage(true);
   }

   return(
      <div className="Home-background">
         <div className="Home-audio">
            <Audio 
               url={AudioUrl} 
               loop={true}
               volume={0.5}
            />
         </div>
         <div className="pikachu">
            <img 
               src={Pikachu}
               style={{ display: changingPage ? 'block' : 'none' }} 
            />
         </div>
         <img src={Beer} className="beer" alt=""/>
         <img src={Beer} className="beer1" alt=""/>
         <Wave />
         <Bubbles />
         <img 
            src={Logo} 
            alt="" 
            className="Home-logo"
         />
         <p className="Home-subtitle">Drinking Game</p>
         <button onClick={() => handleClick()}>Start a Game Session!</button>
      </div>
   )

}

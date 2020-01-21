import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Logo from '../../assets/images/PokemonLogo.svg';
import Beer from '../../assets/images/Beer.svg';
import Wave from '../../components/Wave/Wave';
import Bubbles from '../../components/Bubbles/Bubbles';
import Audio from '../../components/Audio/Audio';
import AudioUrl from '../../assets/audio/Pokemon8Bit.mp3';
import Pikachu from '../../assets/images/drunkPikachu.png';


export default function Home(props) {

   const [changingPage, setChangingPage] = useState(false)
   const [mute, setMute] = useState(false);

   function handleMute() { 
      setMute(!mute) 
   }

   function handleClick(path) {
      setChangingPage(true);
      //Only set mute if it is not muted already.
      !mute && handleMute();
      setTimeout(function() { 
         props.history.push(path);
         setChangingPage(false);
      }, 1000);
   }

   return(
      <>
         <div className={`Home-audio ${!mute && 'Audio-active'}`}>
            <Audio 
               url={AudioUrl} 
               volume={0.5}
               mute={mute}
               handleMute={handleMute}
            />
         </div>
         <div className="Home-background">
            <div className="pikachu">
               <img 
                  src={Pikachu}
                  style={{ display: changingPage ? 'block' : 'none' }} 
                  draggable={false}
               />
            </div>
            <img src={Beer} className="beer" alt="" draggable={false} />
            <img src={Beer} className="beer1" alt="" draggable={false} />
            <Wave />
            <Bubbles />
            <img 
               src={Logo} 
               alt="" 
               className="Home-logo"
               draggable={false}
            />
            <div className="Home-subtitle">
               <p>Drinking<br />Game</p>
            </div>
            <button 
            className="home-button"
            onClick={() => handleClick('/pokemon-game')}>
               Start a Game Session!
            </button>
         </div>
      </>
   )

}

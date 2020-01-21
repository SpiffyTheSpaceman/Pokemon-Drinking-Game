import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {

   const userNav = props.user ? 
      <>
      <div className="nav-welcome" >
         Welcome {props.user.name}!
      </div>
      <Link to='/pokemon-game' className="nav-button" >
         New Game
      </Link>
      <Link to='/high-scores' className="nav-button" >
         High Scores
      </Link>
      <Link to='/my-games' className="nav-button" >
         My Games
      </Link>
      <div className="nav-button" onClick={props.handleLogout}>
         Log Out
      </div>
      </>
      :
      <>
      <Link to='/pokemon-game' className="nav-button" >
         New Game
      </Link>
      <Link to='/high-scores' className="nav-button" >
         High Scores
      </Link>
      <div className="nav-button" onClick={() => props.handleSigninClick()}>
         Sign In
      </div>
      <div className="nav-button" onClick={() => props.handleSignupClick()}>
         Sign Up
      </div>
      </>

   return (
      <nav className="nav-container">
         {userNav}
      </nav>
   )
}
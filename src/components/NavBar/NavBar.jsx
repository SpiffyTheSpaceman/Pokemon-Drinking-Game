import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {

   const userNav = props.user ? 
      <>
      <div className="nav-welcome" >
         Welcome {props.user.name}!
      </div>
      <NavLink to='/' exact className="nav-button" activeClassName="selected" >
         Home
      </NavLink>
      <NavLink to='/pokemon-game' exact className="nav-button" activeClassName="selected">
         New Game
      </NavLink>
      <NavLink to='/high-scores' exact className="nav-button" activeClassName="selected">
         High Scores
      </NavLink>
      <NavLink to='/my-games' exact className="nav-button" activeClassName="selected">
         My Games
      </NavLink>
      <div className="nav-button" onClick={props.handleLogout}>
         Log Out
      </div>
      </>
      :
      <>
      <NavLink to='/' className="nav-button" activeClassName="selected">
         Home
      </NavLink>
      <NavLink to='/pokemon-game' className="nav-button" activeClassName="selected">
         New Game
      </NavLink>
      <NavLink to='/high-scores' className="nav-button" activeClassName="selected">
         High Scores
      </NavLink>
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
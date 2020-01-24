import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {
   //NOTE: you can pass props passed in the state prop of "to" inside the component via props.location.state.propName
   //NOTE: navlink exact property is to make sure that the route has to be exact for it to be considered "active"
   const userNav = props.user ? 
      <>
      <div className="nav-welcome" >
         Welcome {props.user.name}!
      </div>
      <NavLink to='/' exact className="nav-button" activeClassName="selected" >
         Home
      </NavLink>
      <NavLink 
         to={{
            pathname: '/pokemon-game',
            state: { keyCode: null },
         }}
         exact
         className="nav-button" 
         activeClassName="selected"
         >
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
      <NavLink to='/' exact className="nav-button" activeClassName="selected">
         Home
      </NavLink>
      <NavLink 
         to={{
            pathname: '/pokemon-game',
            state: { keyCode: null },
         }}
         exact
         className="nav-button" 
         activeClassName="selected">
         New Game
      </NavLink>
      <NavLink to='/high-scores' exact className="nav-button" activeClassName="selected">
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
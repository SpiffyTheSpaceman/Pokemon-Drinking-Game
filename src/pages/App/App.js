import React, {useState} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import SigninPage from '../SigninPage/SigninPage';
import './App.css';
import './reflex.css';

function App() {

  const [signupActive, setSignupActive] = useState(false);
  const [signinActive, setSigninActive] = useState(false);

  function handleSignupClick() {
    setSignupActive(!signupActive);
  }

  function handleSigninClick() {
    setSigninActive(!signinActive);
  }

  return (
    <div className="App">
      <header className="nav-header">
        <nav className="nav-container">
          <div className="nav-button" onClick={() => handleSigninClick()}>
            Sign In
          </div>
          <div className="nav-button" onClick={() => handleSignupClick()}>
            Sign Up
          </div>
        </nav>
      </header>
      <SigninPage 
      handleBackgroundClick={handleSigninClick}
      active={signinActive}
      />
      <SignupPage 
      handleBackgroundClick={handleSignupClick}
      active={signupActive}
      />
      <Switch>
        <Route exact path='/' render={(props) => 
          <HomePage 
            {...props}
          />
        } />
        <Route exact path='/pokemon-game' render={(props) => 
          <GamePage 
            {...props}
          />
        } />

      </Switch>
    </div>
  );
}

export default App;

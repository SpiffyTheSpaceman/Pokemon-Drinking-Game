import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import SigninPage from '../SigninPage/SigninPage';
import NavBar from '../../components/NavBar/NavBar';
import userService from '../../utils/userService';
import './App.css';
import './reflex.css';

function App() {
  //NOTE: adding a user to state from a token in localStorage is not an asynchronous process
  const [user, setUser] = useState(userService.getUser);

  const [signupEmail, setSignupEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPassword2, setSignupPassword2] = useState('');

  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const [signupActive, setSignupActive] = useState(false);
  const [signinActive, setSigninActive] = useState(false);

  function handleSignupClick() {
    setSignupActive(!signupActive);
  }

  function handleSigninClick() {
    setSigninActive(!signinActive);
  }

  function handleLogout() {
    userService.logout();
    setUser( null );
  }

  function handleSignupOrLogin() {
    setUser(userService.getUser);
  }

  return (
    <div className="App">
      <header 
      className="nav-header"
      >
        <NavBar 
          user={user}
          handleSignupClick={handleSignupClick} 
          handleSigninClick={handleSigninClick}
          handleLogout={handleLogout}
          />
      </header>
      <SigninPage 
      signinEmail={signinEmail}
      signinPassword={signinPassword}
      active={signinActive}
      handleEmailChange={setSigninEmail}
      handlePasswordChange={setSigninPassword}
      handleActivate={handleSigninClick}
      handleSignupOrLogin={handleSignupOrLogin}
      />
      <SignupPage
      signupEmail={signupEmail}
      signupName={signupName}
      signupPassword={signupPassword}
      signupPassword2={signupPassword2}
      active={signupActive}
      handleActivate={handleSignupClick}
      handleEmailChange={setSignupEmail}
      handleNameChange={setSignupName}
      handlePasswordChange={setSignupPassword}
      handlePassword2Change={setSignupPassword2}
      handleSignupOrLogin={handleSignupOrLogin}
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

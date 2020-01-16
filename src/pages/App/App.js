import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
// import logo from './logo.svg';
// <img src={logo}/> 
import './App.css';
import './reflex.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav></nav>
      </header>
      <Switch>
        <Route exact path='/' render={(props) => 
          <Home 
            {...props}
          />
        } />

        
      </Switch>
    </div>
  );
}

export default App;

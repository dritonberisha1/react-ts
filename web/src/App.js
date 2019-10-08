import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;

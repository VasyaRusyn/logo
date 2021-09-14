import React, { useState } from 'react';
import './App.css';
import {Counter} from './features/counter/Counter'
import {Menu} from './features/Menu'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import {StartGame} from './features/setingGame'

 export function Link_app() {
  return (
    <div className="App_link">
      <Router>
          <Switch>
          <Route exact path="/logo" component={Menu} />
          <Route exact path="/logo/starting" component={StartGame} />
          <Route exact path="/logo/starting/Counter" component={Counter} />
        </Switch>
      </Router>
    </div>
  );
}




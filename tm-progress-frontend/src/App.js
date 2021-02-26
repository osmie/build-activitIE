import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./routes/Home";
import { Trends } from "./routes/Trends";
import { Header } from "./Header";

import GlobalStyles from './styles/global';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Header />
        <Switch>
          <Route exact path={`/trends`}>
            <Trends />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

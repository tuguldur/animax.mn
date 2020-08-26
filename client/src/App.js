import React from "react";
import { Header } from "./component";
import { Result, Episode, Home } from "./container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={"/anime/:id/episode/:id"} component={Episode} />
        <Route path={"/anime/:id"} component={Result} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

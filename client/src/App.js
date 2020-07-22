import React from "react";
import { Header } from "./component";
import { Result } from "./container";
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
        <Route path={"/anime/:id"} component={Result} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

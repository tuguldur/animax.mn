import React from "react";
import { Header } from "./component";
import { Result } from "./container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/:id" component={Result} />
      </Switch>
    </Router>
  );
};

export default App;

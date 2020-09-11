import React from "react";
import { Header, Footer } from "./component";
import { Result, Episode, Home } from "./container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path={"/anime/:id/episode/:id"} component={Episode} />
            <Route path={"/anime/:id"} component={Result} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
};

export default App;

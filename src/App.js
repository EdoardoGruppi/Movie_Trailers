import "./App.css";
import React from "react";
import MovieTrailers from "./MovieTrailers/MovieTrailers";
import SearchPage from "./MovieTrailers/SearchPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" component={MovieTrailers} exact></Route>
          <Route path="/search" component={SearchPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

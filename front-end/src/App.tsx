import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import TrackPage from "./TrackPage";

const App = () => {
  return (
    <Router>
      <Route path="/track/" component={TrackPage} />
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;

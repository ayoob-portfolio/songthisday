import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Track from "./Track";

const App = () => {
  return (
    <Router>
      <Route path="/track/" component={Track} />
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;

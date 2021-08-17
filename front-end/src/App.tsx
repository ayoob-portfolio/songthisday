import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Song } from "./Song";
require("dotenv").config();

const App: React.FC = () => {
  return (
    <div>
      <button
        onClick={() =>
          (window.location.href = process.env.REACT_APP_BACKEND_ADDR + "/login")
        }
      >
        LOGIN TO SPOTIFY
      </button>
    </div>
  );
};

export default App;

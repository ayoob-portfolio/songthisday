import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Song } from "./Song";
require("dotenv").config();

const App: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const acess_token = query.get("access_token");

  useEffect(() => {
    console.log(acess_token);
  }, []);

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

import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Song } from "./Song";
import getTrackData from "./API";
require("dotenv").config();

const App: React.FC = () => {
  const songPick: boolean = false;
  const [name, setName] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    getTrackData("6lack");
  }, []);

  return (
    <div>
      <h1>Song this day</h1>
      <h3>
        Find out what happened on the date your favourite song was released
      </h3>
      <div>
        <form>
          <input type="text" value={name} onChange={handleChange} />
          <button type="submit"> LookUp</button>
        </form>
      </div>
      {songPick}
    </div>
  );
};

export default App;

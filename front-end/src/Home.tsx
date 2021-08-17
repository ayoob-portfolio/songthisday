import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import getTracks from "./API";
import { TrackData } from "./API";
require("dotenv").config();

const Home: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const access_token = query.get("access_token");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TrackData[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("HELLO");
    const searchRes = getTracks(searchTerm, access_token);
    searchRes.then((tracks) => setSearchResults(tracks));
  };

  useEffect(() => {
    console.log(access_token);
  }, [access_token]);

  return (
    <div>
      {!access_token && (
        <button
          onClick={() =>
            (window.location.href =
              process.env.REACT_APP_BACKEND_ADDR + "/login")
          }
        >
          LOGIN TO SPOTIFY
        </button>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchResults([]);
              setSearchTerm(e.target.value);
            }}
          />
          <button type="submit">Look Up</button>
        </form>
      </div>
      {searchResults && (
        <ul>
          {searchResults.map((track) => {
            const key = new Date().getTime().toString();
            return (
              <div key={track.id}>
                <img src={track.image} />
                <p>
                  <h3>
                    {track.trackName} by {track.artist}, release date:
                    {track.date}
                  </h3>
                </p>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Home;

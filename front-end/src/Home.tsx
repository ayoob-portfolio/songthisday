import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { getTracks, getName, TrackData } from "./API";
import ChooseTrack from "./Componenets/ChooseTrack";
require("dotenv").config();

const Home: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const access_token = query.get("access_token");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TrackData[]>([]);
  const [name, setName] = useState<String>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("HELLO");
    const searchRes = getTracks(searchTerm, access_token);
    searchRes.then((tracks) => {
      setSearchResults(tracks);
      console.log(tracks);
    });
  };

  useEffect(() => {
    console.log(access_token);
    getName(access_token).then((res) => setName(res));
  }, [access_token]);

  return (
    <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 h-screen">
      {!access_token && (
        <div className="px-44">
          <h2 className="animate-rise font-sans text-white text-4xl text-center">
            Before we continue, we need you to sign into spotify
          </h2>
          <br />
          <div className="flex items-center justify-center animate-slowrise">
            <a href={process.env.REACT_APP_BACKEND_ADDR + "/login"}>
              <button className="border-2 border-black rounded-full bg-white text-2xl px-6 py-2 font-sans">
                <p className="font-sans">LOGIN TO SPOTIFY</p>
              </button>
            </a>
          </div>
        </div>
      )}
      <div>
        {access_token && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchResults([]);
                setSearchTerm(e.target.value);
              }}
            />
            <p>{name}</p>
            <button type="submit">Look Up</button>
          </form>
        )}
      </div>
      {searchResults && (
        <ul>
          {searchResults.map((track) => {
            const key = new Date().getTime().toString();
            return (
              <ChooseTrack
                key={key}
                track={track}
                access_token={access_token}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Home;

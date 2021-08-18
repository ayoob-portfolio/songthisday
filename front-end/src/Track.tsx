import React, { useEffect, useState } from "react";
import { TrackData, getTrack } from "./API";

const Track = () => {
  const query = new URLSearchParams(window.location.search);
  const access_tokenCheck = query.get("access_token");
  let idCheck = query.get("id");
  const access_token = access_tokenCheck == null ? "" : access_tokenCheck;
  const id = idCheck == null ? "" : idCheck;

  const noTrack = {
    image: "",
    id: id,
    trackName: "",
    date: "",
    artist: "",
  };

  const [track, setTrack] = useState<TrackData>(noTrack);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrack(id, access_token).then((track) => {
      setTrack(track);
      setLoading(false);
    });
    console.log(access_tokenCheck, id);
  }, []);

  const { trackName, date, artist, image } = track;

  return (
    <div>
      {!loading && (
        <div>
          <h2>
            {trackName} by {artist}
          </h2>
          <h3>Released on {date}</h3>
          <img src={image} alt="picutre" />
        </div>
      )}
    </div>
  );
};

export default Track;

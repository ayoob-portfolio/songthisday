import axios from "axios";
require("dotenv").config();

export interface TrackData {
  name: string;
  artist: string;
  image: string;
  date: string;
}

export const noTrack: TrackData = {
  name: "No name",
  artist: "No artist",
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.E4gCagrjAkQ5td5qjSc3rwHaE7%26pid%3DApi&f=1",
  date: "12-12-2001",
};

const spotifyEndPoint = "https://api.spotify.com/v1/search";

export default async function getTrackData(name: string): Promise<TrackData> {
  const requestUrl = spotifyEndPoint + "?q=" + name + "&type=track";
  const res1 = await axios.get(requestUrl, {
    headers: {
      data: {
        q: name,
        type: "track",
      },
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.REACT_APP_SPOTIFY_API_KEY,
    },
  });
  const res = res1.data();
  console.log(res1);
  console.log(res);
  return noTrack;
}

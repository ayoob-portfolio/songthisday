import axios from "axios";

const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

async function getTracks(
  name: string,
  access_token: string | null
): Promise<string[]> {
  const seenArtists = new Set();
  const res: string[] = [];

  const resp = await axios
    .get(SPOTIFY_SEARCH_ENDPOINT + "?q=" + name + "&type=track", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
    .then((resp) => {
      return resp.data.tracks.items;
    })
    .then((trackList) => {
      let track: any = null;
      for (let i = 0; i < 20; i++) {
        track = trackList[i];
        let artist = track.album.artists[0].name;
        console.log(artist);
        if (!seenArtists.has(artist)) {
          seenArtists.add(artist);
          res.push(track.name + " by " + artist);
        }
      }
    })
    .catch(() => {
      return ["None"];
    });

  return res;
}

export default getTracks;

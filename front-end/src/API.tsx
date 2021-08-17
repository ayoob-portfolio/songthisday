import axios from "axios";

const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

export interface TrackData {
  trackName: string;
  artist: string;
  image: string;
  date: string;
  id: string;
}

async function getTracks(
  name: string,
  access_token: string | null
): Promise<TrackData[]> {
  const seenArtists = new Set();
  const res: TrackData[] = [];

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
      console.log(trackList);
      let track: any = null;
      for (let i = 0; i < 20; i++) {
        track = trackList[i];
        let artist = track.album.artists[0].name;
        if (!seenArtists.has(artist)) {
          let image = track.album.images[1].url;
          seenArtists.add(artist);
          res.push({
            trackName: track.name,
            image,
            artist,
            date: track.album.release_date,
            id: track.id,
          });
        }
      }
    })
    .catch(() => {
      return ["None"];
    });

  return res;
}

export default getTracks;

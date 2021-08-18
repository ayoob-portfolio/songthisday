import axios from "axios";

const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1";

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
    .get(SPOTIFY_SEARCH_ENDPOINT + "/search?q=" + name + "&type=track", {
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
      res.push({
        trackName: "NONE",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AQIbtt2CgLi6nTHo4qBZ9QAAAA%26pid%3DApi&f=1",
        artist: "Your mum",
        id: "1232434532",
        date: "12-12-2001",
      });
    });

  return res;
}

export async function getTrack(
  id: string,
  access_token: string
): Promise<TrackData> {
  let res: TrackData = {
    trackName: "",
    image: "",
    artist: "",
    date: "",
    id: "",
  };

  const resp = await axios
    .get(SPOTIFY_SEARCH_ENDPOINT + "/tracks/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .then((track) => {
      const name = track.name;
      const image = track.album.images[0].url;
      const artist = track.album.artists[0].name;
      const date = track.album.release_date;
      res = {
        trackName: name,
        image: image,
        artist: artist,
        date: date,
        id: id,
      };
    })
    .catch(() => {});

  return res;
}

export default getTracks;

import axios from "axios";

const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1";
const WIKIMEDIA_SEARCH_ENDPOINT =
  "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all";

export interface TrackData {
  trackName: string;
  artist: string;
  image: string;
  date: string;
  id: string;
}

export interface EventData {
  type: string;
  url: string;
  text: string;
  year: string;
}

export async function getTracks(
  name: string,
  access_token: string | null
): Promise<TrackData[]> {
  const seenArtists = new Set();
  const res: TrackData[] = [];

  await axios
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

  await axios
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

export async function getName(access_token: String | null): Promise<String> {
  let res = "";
  await axios
    .get(SPOTIFY_SEARCH_ENDPOINT + "/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then((resp) => {
      const data = resp.data;
      console.log(data.display_name);
      res = data.display_name;
    })
    .catch((err) => {
      console.log(err);
      res = "Err";
    });
  return res;
}

export async function getEvents(
  day: string,
  month: string
): Promise<EventData[]> {
  const url = WIKIMEDIA_SEARCH_ENDPOINT + "/" + month + "/" + day;
  console.log("URL IS ", url);
  const res: EventData[] = [];

  await axios
    .get(url)
    .then((resp) => {
      const { selected, births, deaths, events } = resp.data;
      fillEvents(res, selected, births, events, deaths);
    })
    .catch((err) => {
      console.log(err);
      const errEvent: EventData = {
        type: "ERR",
        url: "ERR",
        year: "ERR",
        text: "ERR",
      };
      res.push(errEvent);
    });

  return res;
}

function fillEvents(
  res: EventData[],
  selected: any[],
  births: any[],
  events: any[],
  deaths: any[]
): void {
  addItems(res, "selected", selected);
  addItems(res, "births", births);
  addItems(res, "events", events);
  addItems(res, "deaths", deaths);
}

function addItems(res: EventData[], type: string, events: any[]) {
  events.forEach((event) => {
    console.log(event);
    const { year, text } = event;
    const url = event.pages[0].content_urls.desktop.page;
    const newEvent: EventData = {
      type: type,
      year: year,
      text: text,
      url: url,
    };
    res.push(newEvent);
  });
}

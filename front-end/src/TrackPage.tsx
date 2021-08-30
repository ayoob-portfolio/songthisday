import React, { useEffect, useState } from "react";
import { TrackData, getTrack, EventData, getEvents } from "./API";
import { Event } from "./Componenets/Event";
import { FilterButton } from "./Componenets/FilterButton";
import { GoBackButton } from "./Componenets/GoBackButton";

const TrackPage = () => {
  const query = new URLSearchParams(window.location.search);
  const access_tokenCheck = query.get("access_token");
  let idCheck = query.get("id");
  const access_token = access_tokenCheck == null ? "" : access_tokenCheck;
  const id = idCheck == null ? "" : idCheck;
  const types: string[] = ["deaths", "births", "selected", "events"];

  const noTrack = {
    image: "",
    id: id,
    trackName: "",
    date: "",
    artist: "",
  };

  const [track, setTrack] = useState<TrackData>(noTrack);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<EventData[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    getTrack(id, access_token).then((track) => {
      setTrack(track);
      setLoading(false);
      const month = track.date.substring(5, 7);
      const day = track.date.substring(8, 10);
      getEvents(day, month).then((events) => {
        setEvents(events);
        setVisibleEvents(events);
      });
    });
  }, []);

  const filterEvent = (type: string) => {
    setVisibleEvents([]);
    setVisibleEvents(events.filter((event) => event.type === type));
  };

  const { trackName, date, artist, image } = track;

  return (
    <div>
      <GoBackButton></GoBackButton>
      {!loading && (
        <div>
          <h2>
            {trackName} by {artist}
          </h2>
          <h3>Released on {date}</h3>
          <img src={image} alt="picutre" />
        </div>
      )}
      {types.map((type) => {
        return (
          <FilterButton type={type} filterFunc={filterEvent}></FilterButton>
        );
      })}
      {visibleEvents.map((event) => {
        const { url, text, year, type } = event;
        return (
          <Event
            key={new Date().getDate().toString()}
            type={type}
            year={year}
            text={text}
            url={url}
          ></Event>
        );
      })}
    </div>
  );
};

export default TrackPage;

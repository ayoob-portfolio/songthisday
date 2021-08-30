import React from "react";
import { EventData } from "../API";

export const Event: React.FC<EventData> = (event) => {
  return (
    <div>
      <h4>{event.year}</h4>
      <h5>{event.text}</h5>
    </div>
  );
};

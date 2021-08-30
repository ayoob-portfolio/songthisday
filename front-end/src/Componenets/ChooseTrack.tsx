import React from "react";
import { CSSProperties } from "react";
import { TrackData } from "../API";
import { useHistory } from "react-router";

interface Props {
  track: TrackData;
  access_token: string | null;
}

const ChooseTrack: React.FC<Props> = (props) => {
  const history = useHistory();
  const { track, access_token } = props;
  return (
    <div
      key={track.id}
      style={styles}
      onClick={() => {
        history.push("track/?access_token=" + access_token + "&id=" + track.id);
      }}
    >
      <img alt="Album art" src={track.image} />
      <p>
        <h3>
          {track.trackName} by {track.artist}, release date:
          {track.date}
        </h3>
      </p>
    </div>
  );
};

const styles: CSSProperties = {
  borderTopWidth: "5px",
  borderTopStyle: "solid",
  borderBottomWidth: "5px",
  borderBottomStyle: "solid",
  borderRightWidth: "5px",
  borderRightStyle: "solid",
  borderLeftWidth: "5px",
  borderLeftStyle: "solid",
};

export default ChooseTrack;

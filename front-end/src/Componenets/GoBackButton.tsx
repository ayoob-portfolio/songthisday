import React from "react";
import { useHistory, Link } from "react-router-dom";
require("dotenv").config();

export const GoBackButton = () => {
  const history = useHistory();
  return (
    <div>
      <a href={process.env.REACT_APP_HOMEPAGE || "http://localhost:3000"}>
        <button>GO BACK</button>
      </a>
    </div>
  );
};

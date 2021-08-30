import React from "react";

interface Props {
  type: String;
  filterFunc(type: String): void;
}

export const FilterButton = (props: Props) => {
  const { type, filterFunc } = props;
  return (
    <div>
      <button onClick={() => filterFunc(type)}>{type}</button>
    </div>
  );
};

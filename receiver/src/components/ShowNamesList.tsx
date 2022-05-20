import React from "react";
import { ShowElement } from "./ShowElement";

export const Show = ({ names }) => {
  return (
    <div>
      <h3>Names List</h3>
      {/* <ShowElement name={props.names[0]}/> */}

      {names.length == 0
        ? "No names to display"
        : names.map((e) => {
            return <ShowElement name={e.name} />;
          })}
    </div>
  );
};

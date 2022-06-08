import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function DestinationsList(props) {
  return (
    <div className="planetList">
      {props.data &&
        props.data.map((receiver, i) => {
          let borderClass = "border-b";
          if (i === 0) {
            borderClass = "border-t border-b";
          } else if (i + 1 === props.data.length) {
            borderClass = "";
          }
          return (
            <Link
              key={receiver.name}
              className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
              to={`/receiver/${receiver.name}`}
            >
              {receiver.name}
            </Link>
          );
        })}
      {props.loading && <div>Loading ...</div>}
    </div>
  );
}

export default DestinationsList;

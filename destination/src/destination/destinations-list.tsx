import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function DestinationsList(props) {
  const { loading, destinations, match, onClick } = props;

  return (
    <div className="planetList">
      {destinations && destinations.map((destination, i) => {
        let borderClass = "border-b";
        if (i === 0) {
          borderClass = "border-t border-b";
        } else if (i + 1 === destinations.length) {
          borderClass = "";
        }
        return (
          <Link
            key={destination.name}
            className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
            to={`/destination/${destination.name}`}
          >
            {destination.name}
          </Link>
        );
      })}
      {loading && <div>Loading ...</div>}
    </div>
  );
}

export default DestinationsList;

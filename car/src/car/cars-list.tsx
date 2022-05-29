import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function CarsList(props) {
  return (
    <div className="planetList">
      {props.data &&
        props.data.map((car, i) => {
          let borderClass = "border-b";
          if (i === 0) {
            borderClass = "border-t border-b";
          } else if (i + 1 === props.data.length) {
            borderClass = "";
          }
          return (
            <Link
              key={car.name}
              className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
              to={`/car/${car.name}`}
            >
              {car.name}
            </Link>
          );
        })}
      {props.loading && <div>Loading ...</div>}
    </div>
  );
}

export default CarsList;

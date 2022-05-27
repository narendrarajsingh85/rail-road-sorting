import React, { useEffect, useState } from "react";
import { getDestination } from "../utils/api";

export default function SelectedDestination(props) {
  const { name } = props;
  const [selectedDestination, setDestination] = useState({name: '', classificationOrder: 0});

  useEffect(() => {
    setDestination({name: '', classificationOrder: 0})
    if (name) {
      getDestination(name).then((destination) => {
        setDestination(destination);
      });
    }
  }, [name]);

  if (!selectedDestination || !selectedDestination.name) {
    return <div>Click on a destination to see the details</div>;
  }

  return (
    <div>
       <div className="flex">
        <div className="pr-6 w-60 font-bold">City Name</div>
        <div>{selectedDestination && selectedDestination.name}</div>
       </div>
       <div className="flex">
        <div className="pr-6 w-60 font-bold">Classification Order</div>
        <div>{selectedDestination && selectedDestination.classificationOrder}</div>
       </div>
    </div>
  );
}

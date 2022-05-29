import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Button from "../utils/button.component";

export default function SelectedCar(props) {
  const { name } = props;

  // const [selectedDestination, setDestination] = useState({name: '', classificationOrder: 0});
  const {
    isLoading,
    data: selectedCar,
    refetch,
    isFetched,
  } = useQuery(
    "getCar",
    async () => {
      return await axios.get(`http://localhost:8081/car/${name}`);
    },
    {
      enabled: true,
      onSuccess: (data) => {
        //console.log(data.data)
      },
    }
  );
  /*
  const updateDestination = async (destination, id) => {
    return await axios.put(`http://localhost:8081/destination/${id}`, destination);
  };

   const useUpdateDestination=()=>{
    return useMutation(updateDestination())
  }


  
  const {mutate:updateData}=useUpdateDestination()*/

  const deleteCar = async (id) => {
    return await axios.delete(`http://localhost:8081/car/${id}`);
  };

  const useDeleteCar = () => {
    return useMutation(deleteCar);
  };

  const { mutate: deleteData } = useDeleteCar();

  useEffect(() => {
    //setDestination({name: '', classificationOrder: 0})
    if (name) {
      refetch();
    }
  }, [name]);

  if (!selectedCar || !selectedCar.data.name) {
    return <div>Click on a destination to see the details</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">City Name</div>
        <div>{selectedCar && selectedCar.data.name}</div>
      </div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">Classification Order</div>
        <div>{selectedCar && selectedCar.data.destination.name}</div>
      </div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">Receiver</div>
        <div>{selectedCar && selectedCar.data.receiver.name}</div>
      </div>
      <div>
        <Button
          onClick={() => {
            selectedCar && deleteData(selectedCar.data.name);
            props.reload((prev) => !prev);
          }}
        >
          Delete
        </Button>
        {/*
            <Button
       onClick={()=>{selectedDestination && updateData(selectedDestination.data,selectedDestination.data.name)}}>
              Update
        </Button>*/}
      </div>
    </div>
  );
}

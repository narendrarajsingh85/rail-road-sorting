import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Button from "../utils/button.component";
import { getDestination } from "../utils/api";

export default function SelectedDestination(props) {
  const { name } = props;

  // const [selectedDestination, setDestination] = useState({name: '', classificationOrder: 0});
  const {
    isLoading,
    data: selectedDestination,
    refetch,
    isFetched,
  } = useQuery(
    "getDestination",
    async () => {
      return await axios.get(`http://localhost:8081/destination/${name}`);
    },
    {
      enabled: true,
      onSuccess: (data) => {
        // console.log(data.data)
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

  const deleteDestination = async (id) => {
    return await axios.delete(`http://localhost:8081/destination/${id}`);
  };

  const useDeleteDestination = () => {
    return useMutation(deleteDestination);
  };

  const { mutate: deleteData } = useDeleteDestination();

  useEffect(() => {
    //setDestination({name: '', classificationOrder: 0})
    if (name) {
      refetch();
    }
  }, [name]);

  if (!selectedDestination || !selectedDestination.data.name) {
    return <div>Click on a destination to see the details</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">City Name</div>
        <div>{selectedDestination && selectedDestination.data.name}</div>
      </div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">Classification Order</div>
        <div>
          {selectedDestination && selectedDestination.data.classificationOrder}
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            selectedDestination && deleteData(selectedDestination.data.name);
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

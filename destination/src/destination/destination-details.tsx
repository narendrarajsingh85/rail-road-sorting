import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "../utils/button.component";
import { getDestination } from "../utils/api";

export default function SelectedDestination(props) {
  const { name, onDelete } = props;
  const queryClient = useQueryClient();

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

  const deleteDestination = (e) => {
    return axios.delete(`http://localhost:8081/destination/${e.target.name}`);
  };

  const useDeleteDestination = () => {
    return useMutation(deleteDestination, {
      onSuccess: ({ data }) => {
        console.log(data);
        queryClient.setQueryData(
          "getDestinations",
          (oData: { data: [{ name: string }] }) => ({
            ...oData,
            data: oData.data.filter((d) => d.name !== data.name),
          })
        );

        onDelete && onDelete(data);
      },
    });
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
        <Button onClick={deleteData} name={selectedDestination.data.name}>
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

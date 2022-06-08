import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "../utils/button.component";
// import { getReceiver } from "../utils/api";

export default function SelectedReceiver(props) {
  const { name, onDelete } = props;
  const queryClient = useQueryClient();

  // const [selectedReceiver, setReceiver] = useState({name: '', sortOrder: 0});
  const {
    isLoading,
    data: selectedReceiver,
    refetch,
    isFetched,
  } = useQuery(
    "getReceiver",
    async () => {
      return await axios.get(`http://localhost:8081/receiver/${name}`);
    },
    {
      enabled: true,
      onSuccess: (data) => {
        // console.log(data.data)
      },
    }
  );
  /*
  const updateReceiver = async (receiver, id) => {
    return await axios.put(`http://localhost:8081/receiver/${id}`, receiver);
  };

   const useUpdateReceiver=()=>{
    return useMutation(updateReceiver())
  }


  
  const {mutate:updateData}=useUpdateReceiver()*/

  const deleteReceiver = (e) => {
    return axios.delete(`http://localhost:8081/receiver/${e.target.name}`);
  };

  const useDeleteReceiver = () => {
    return useMutation(deleteReceiver, {
      onSuccess: ({ data }) => {
        console.log(data);
        queryClient.setQueryData(
          "getReceivers",
          (oData: { data: [{ name: string }] }) => ({
            ...oData,
            data: oData.data.filter((d) => d.name !== data.name),
          })
        );

        onDelete && onDelete(data);
      },
    });
  };

  const { mutate: deleteData } = useDeleteReceiver();

  useEffect(() => {
    //setReceiver({name: '', sortOrder: 0})
    if (name) {
      refetch();
    }
  }, [name]);

  if (!selectedReceiver || !selectedReceiver.data.name) {
    return <div>Click on a receiver to see the details</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">City Name</div>
        <div>{selectedReceiver && selectedReceiver.data.name}</div>
      </div>
      <div className="flex">
        <div className="pr-6 w-60 font-bold">Sort Order</div>
        <div>{selectedReceiver && selectedReceiver.data.sortOrder}</div>
      </div>
      <div>
        <Button onClick={deleteData} name={selectedReceiver.data.name}>
          Delete
        </Button>
        {/*
            <Button
       onClick={()=>{selectedReceiver && updateData(selectedReceiver.data,selectedReceiver.data.name)}}>
              Update
        </Button>*/}
      </div>
    </div>
  );
}

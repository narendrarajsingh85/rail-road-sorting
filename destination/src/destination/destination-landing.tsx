import React, { useReducer, useEffect, useState } from "react";
import { getDestinations, addDestination, getDestination } from "../utils/api";
import DestinationsList from "./destinations-list";
import { DESTINATION_BASE_URL } from "../api-constants";
import SelectedDestination from "./destination-details";
import Button from "../utils/button.component";
import Destination from "./destination";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function LandingPage(props) {
  const [reload, setReload] = useState(true);
  const [isUpdteCall, setUpdateCall] = useState(false);
  const queryClient = useQueryClient();

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [type, setType] = useState("selected");
  const [fetch, setFetch] = useState(true);
  const [path, setPath] = useState("");
  const [destinations, setDestinations] = useState([]);

  const { pathname } = props.location;
  const { history } = props;
  const { isLoading, data, refetch, isFetched } = useQuery(
    "getDestinations",
    async () => {
      return await axios.get("http://localhost:8081/destination");
    },
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data.data);
        setDestinations(data.data);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [isFetched]);

  useEffect(() => {
    if (fetch) {
      refetch();
    }

    setFetch(false);
  }, [fetch, reload]);

  useEffect(() => {
    const currentPath = pathname.substring(pathname.lastIndexOf("/") + 1);
    setPath(currentPath);
    setType(currentPath === "create" ? "create" : "selected");
  }, [pathname]);

  const create = () => {
    history.push("/destination/create");
  };

  const update = () => {
    history.push("/destination/update");
  };

  const addDestination = async (destination) => {
    return await axios.post("http://localhost:8081/destination", destination);
  };

  const useAddDestination = () => {
    return useMutation(addDestination, {
      onSuccess: ({ data }) => {
        console.log(data);
        queryClient.setQueryData("getDestinations", (oData: { data: [] }) => ({
          ...oData,
          data: [...oData.data, data],
        }));
      },
    });
  };

  const { mutate: addData } = useAddDestination();

  const handleCreate = (value) => {
    if (!isUpdteCall) addData(value);
    else {
    }
    history.push(DESTINATION_BASE_URL);
    refetch();
  };

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          <Button disabled={isLoading} loading={isLoading} onClick={create}>
            Add Destination
          </Button>
          <DestinationsList
            loading={isLoading}
            data={destinations}
            onClick={setType}
          />
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          <div className="destination">
            {type === "selected" && (
              <SelectedDestination
                reload={setReload}
                name={path !== "destination" ? path : ""}
              />
            )}
            {type === "create" && <Destination handleSubmit={handleCreate} />}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

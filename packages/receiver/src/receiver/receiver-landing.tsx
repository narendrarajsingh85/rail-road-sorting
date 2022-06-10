import React, { useReducer, useEffect, useState } from "react";
// import { getReceivers, addReceiver, getReceiver } from "../utils/api";
import ReceiversList from "./receivers-list";
import { RECEIVER_BASE_URL } from "../api-constants";
import SelectedReceiver from "./receiver-details";
import Button from "../utils/button.component";
import Receiver from "./receiver";
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
  const [receivers, setReceivers] = useState([]);

  const { pathname } = props.location;
  const { history } = props;
  const { isLoading, data, refetch, isFetched } = useQuery(
    "getReceivers",
    async () => {
      return await axios.get("http://localhost:8081/receiver");
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setReceivers(data.data);
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
    history.push("/receiver/create");
  };

  const update = () => {
    history.push("/receiver/update");
  };

  const addReceiver = async (receiver) => {
    return await axios.post("http://localhost:8081/receiver", receiver);
  };

  const useAddReceiver = () => {
    return useMutation(addReceiver, {
      onSuccess: ({ data }) => {
        queryClient.setQueryData("getReceivers", (oData: { data: [] }) => ({
          ...oData,
          data: [...oData.data, data],
        }));
      },
    });
  };

  const { mutate: addData } = useAddReceiver();

  const handleCreate = (value) => {
    if (!isUpdteCall) addData(value);
    else {
    }
    history.push(RECEIVER_BASE_URL);
    refetch();
  };

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          <Button disabled={isLoading} loading={isLoading} onClick={create}>
            Add Receiver
          </Button>
          <ReceiversList
            loading={isLoading}
            data={receivers}
            onClick={setType}
          />
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          <div className="receiver">
            {type === "selected" && (
              <SelectedReceiver
                onDelete={() => {
                  history.goBack();
                  setType("");
                }}
                name={path !== "receiver" ? path : ""}
              />
            )}
            {type === "create" && <Receiver handleSubmit={handleCreate} />}
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

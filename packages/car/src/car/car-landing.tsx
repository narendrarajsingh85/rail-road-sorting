import React, { useReducer, useEffect, useState } from "react";
import CarsList from "./cars-list";
import { CAR_BASE_URL } from "../api-constants";
import SelectedDestination from "./car-details";
import Button from "../utils/button.component";
import Car from "./car";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import SelectedCar from "./car-details";

export default function LandingPage(props) {
  const [reload, setReload] = useState(true);
  const [isUpdteCall, setUpdateCall] = useState(false);
  const queryClient = useQueryClient();

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [type, setType] = useState("selected");
  const [fetch, setFetch] = useState(true);
  const [path, setPath] = useState("");
  const [cars, setCars] = useState([]);

  const { pathname } = props.location;
  const { history } = props;
  const { isLoading, data, refetch, isFetched } = useQuery(
    "getCars",
    async () => {
      return await axios.get("http://localhost:8081/car/sort");
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setCars(data.data);
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
    history.push("/car/create");
  };

  const update = () => {
    history.push("/car/update");
  };

  const addCar = async (car) => {
    return await axios.post("http://localhost:8081/car", car);
  };

  const useAddCar = () => {
    return useMutation(addCar, {
      onSuccess: ({ data }) => {
        queryClient.setQueryData("getCars", (oData: { data: [] }) => ({
          ...oData,
          data: [...oData.data, data],
        }));
      },
    });
  };

  const { mutate: addData } = useAddCar();

  const handleCreate = (value) => {
    if (!isUpdteCall) addData(value);
    else {
    }
    history.push(CAR_BASE_URL);
    refetch();
  };

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          <Button disabled={isLoading} loading={isLoading} onClick={create}>
            Add Destination
          </Button>
          <CarsList loading={isLoading} data={cars} onClick={setType} />
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          <div className="destination">
            {type === "selected" && (
              <SelectedCar
              onDelete={() => {
                history.goBack();
                setType("");
              }}
                name={path !== "car" ? path : ""}
              />
            )}
            {type === "create" && <Car handleSubmit={handleCreate} />}
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

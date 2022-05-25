import React, { useReducer, useEffect, useState } from "react";
import { getDestinations, addDestination } from '../utils/api'
import DestinationsList from './destinations-list'
import { DESTINATION_BASE_URL } from "../api-constants";
import SelectedDestination  from './destination-details'
import Button from '../utils/button.component'
import Destination from "./destination";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function LandingPage(props) {
  const initialState = {
    planets: [],
    loading: false,
    page: 0,
    nextPage: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [type, setType] = useState('selected');
  const [fetch, setFetch] = useState(true);
  const [path, setPath] = useState('');
  
  const { page, loading } = state;
  const { pathname } = props.location;
  const { history } = props
  

  useEffect(() => {
    if (fetch) {
      const req$ = getDestinations().then((results) => {
        setFetch(false)
        dispatch({
          type: "fetchDestinations",
          payload: {
            results: results,
          },
        });
      });
    }
  }, [fetch]);

  useEffect(() => {
    const currentPath = pathname.substring(pathname.lastIndexOf('/')+1);
    setPath(currentPath)
    setType(currentPath === 'create' ? 'create' : 'selected')
  }, [pathname])

  const create = () => {
    history.push('/destination/create')
  }

  const handleCreate = (value) => {
    addDestination(value).then(
      (res) => {
        if(res.error) {
          toast.error(
            "Error"
          );  
        } else {
          setFetch(true)
          toast.success(
            "Success"
          );
          history.push(DESTINATION_BASE_URL)
        }
      }
    );
  }

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
            <Button
              disabled={loading}
              loading={loading}
              onClick={create}
            >
              Add Destination
            </Button>
        <DestinationsList {...state} onClick={setType} />
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          <div className="destination">
            {type === 'selected' && <SelectedDestination name={path !== 'destination' ? path : '' } />}
            {type === 'create' && <Destination handleSubmit={handleCreate} />}
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

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "fetchDestinations":
      const { payload } = action;
      newState.loading = false;
      newState.destinations = payload.results;
      return newState;
    case "addDestination":
      newState.loading = true;
      newState.page = newState.page + 1;
      return newState;
    default:
      return state;
  }
}

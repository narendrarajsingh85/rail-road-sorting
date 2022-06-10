import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Button from "../utils/button.component";

export default function Car(props) {
  const { handleSubmit } = props;
  const [value, setValue] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [receivers, setReceivers] = useState([]);

  useQuery(
    "destinations",
    () => axios.get("http://localhost:8081/destination"),
    {
      onSuccess: (data) => { setDestinations(data.data); },
    }
  );

  useQuery(
    "receivers",
    () => axios.get("http://localhost:8081/receiver"),
    {
      onSuccess: (data) => { setReceivers(data.data); },
    }
  );

  const submit = async (e) => {
    e.preventDefault();
    handleSubmit(value);
  };

  const onChange = (e) => {
    let currentValue: any = value;
    currentValue[e.target.name] = e.target.value;
    setValue(currentValue);
  };

  return (
    <div>
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray text-sm font-bold mb-2"
            htmlFor="name"
          >
            Car Name
          </label>
          <input
            className="shadow appearance-none border text-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => onChange(e)}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray text-sm font-bold mb-2"
            htmlFor="name"
          >
            Destination Name
          </label>
          <select
            name="destination"
            id="destination"
            className="shadow appearance-none border text-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChange}
          >
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray text-sm font-bold mb-2"
            htmlFor="name"
          >
            Receiver Name
          </label>
          <select
            name="receiver"
            id="receiver"
            className="shadow appearance-none border text-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChange}
          >
            <option value="">Select a receiver</option>
            {receivers.map((r) => (
              <option value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import Button from "../utils/button.component";
import Input from "../utils/input.component";

export default function Destination(props) {
  const { handleSubmit } = props;
  const [value, setValue] = useState({});

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
            Destination City Name
          </label>
          <Input
            className="shadow appearance-none border text-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => onChange(e)}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray text-sm font-bold mb-2"
            htmlFor="order"
          >
            Destination Classification Order
          </label>
          <Input
            className="shadow appearance-none border text-gray rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="number"
            name="classificationOrder"
            onChange={(e) => onChange(e)}
            placeholder="Classification Order"
          />
        </div>
        <div className="flex items-center">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}

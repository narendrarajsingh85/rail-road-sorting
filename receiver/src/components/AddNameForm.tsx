import React, { useState } from "react";

export const Add = ({ addName }) => {
  const [name, setName] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log("Working");
    if (!name) {
      alert("Please enter");
    } else {
      addName(name);
      setName("");
    }
  };
  return (
    <div className="container my-3">
      <h3>Add a Name</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Name
        </button>
      </form>
    </div>
  );
};

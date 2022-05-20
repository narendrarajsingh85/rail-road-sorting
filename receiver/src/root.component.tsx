import { useState } from "react";

export default function Root() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    if (name) {
      setList((ls) => [...list, data]);
      setName("");
    }
  };

  return (
    <div>
      <h1>Receiver</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add Item</button>
      </form>
      {list.map((a, index) => (
        <li key={index}>{a.name}</li>
      ))}
    </div>
  );
}

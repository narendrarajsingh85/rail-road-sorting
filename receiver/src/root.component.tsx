// export default function Root(props) {
//   return <section>{props.name} is mounted!</section>;
// }
import React, { useState } from "react";
import { Add } from "./components/Add";
import { Show } from "./components/Show";
function root() {
  const [names, setNames] = useState([]);
  const addName = (name) => {
    console.log("Adding");
    const myName = {
      name: name,
    };
    setNames([...names, myName.name]);
    console.log(myName.name);
  };
  return (
    <div>
      <Add addName={addName} />
      <Show names={names} />
    </div>
  );
  // const[name,setName]=useState("");
  // const[list,setList]=useState([]);
  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   console.log(name);
  //   const data={name};
  //   if(name){
  //     setList((ls)=>[...list,data])
  //     setName("")
  //   }
  // }
  // console.log(list);
  // return (
  //   <div>
  //     <h1>Receiver</h1>
  //     <form onSubmit={handleSubmit}>
  //     <input name="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
  //     <button>Add Item</button>
  //     </form>
  //     {
  //       list.map((a)=>(
  //         <></>
  //       )
  //       )
  //     }
  //   </div>
  // )
}

export default root;

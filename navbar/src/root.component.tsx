import React from "react";
import { links } from "./root.helper.js";
import { Link } from "@reach/router";
import { ToastContainer } from 'react-toastify';

export default function Root(props) {
  return (
    <>
    <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
      <div className="flex items-center justify-between">
        {links.map((link) => {
          return (
            <Link key={link.href} className="p-6 font-bold red" to={link.href}>
              {link.name}
            </Link>
          );
        })}
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
</>
  );
}

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./destination/destination-landing";
import SelectedDestination from "./destination/destination-details";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route path="/destination" component={LandingPage}></Route>
    </BrowserRouter>
  );
}
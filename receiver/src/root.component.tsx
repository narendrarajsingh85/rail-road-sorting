import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./receiver/receiver-landing";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Root(props) {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Route path="/receiver" component={LandingPage}></Route>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

import React from "react";
import { ToastContainer } from "react-toastify";
import { RoutesAll } from "./Router";

function App() {
  return (
    <>
      <RoutesAll />
      <ToastContainer />
    </>
  );
}

export default App;

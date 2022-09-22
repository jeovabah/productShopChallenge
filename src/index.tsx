import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/Auth";
import "antd/dist/antd.css";
import { ProductProvider } from "./providers/Product";
import { Providers } from "./providers";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Providers>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Providers>
  </BrowserRouter>
);

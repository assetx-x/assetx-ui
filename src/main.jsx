import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@availity/block-ui/dist/index.css";
import { MainProvider } from "./store/context/MainContext.jsx";
import App from "./App";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainProvider>
          <App />
      </MainProvider>
    </BrowserRouter>
  </React.StrictMode>
);

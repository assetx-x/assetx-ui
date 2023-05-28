import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@availity/block-ui/dist/index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProviders from "./store/context/AppProviders.jsx";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);

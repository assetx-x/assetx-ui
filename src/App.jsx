import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AppRouter from "./routes/index.jsx";
import "react-tooltip/dist/react-tooltip.css";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

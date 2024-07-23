import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PrivateRoute from "../src/routes/PrivateRoute";
import PortfolioAnalysis from "./pages/stockMarketDetails/PortfolioAnalysis.jsx";
import PortfolioAnalysisResultsContainer from "./pages/stockMarketDetails/PortfolioAnalysisResultsContainer.jsx";
import NewTickerDetial from "./pages/tickerDetail/NewTickerDetial.jsx";
import Register from "./pages/register/Register.jsx";
import DeepInsightDetails from "./pages/deepInsightDetail/DeepInsightDetails.jsx";
import AiDrivenInsights from "./pages/aiDrivenInsights/AIDrivenInsights.jsx";
import Market from "./pages/market/Market.jsx";
import "react-tooltip/dist/react-tooltip.css";
import StockMarket from "./pages/stockMarket/stockMarket.jsx";
import Holding from "./pages/holding/Holding.jsx";
import Strategies from "./pages/Strategies";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/holding" element={<Holding />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route
              path="/:market/ticker/:ticker"
              element={<NewTickerDetial />}
            />
            {/*TODO: stop using magic strings*/}
            <Route path="/:market" element={<Market />} />
            <Route
              path="/:market/portfolio-analysis/:id"
              element={
                <PortfolioAnalysisResultsContainer
                  selected={"portfolio-analysis"}
                />
              }
            />
            <Route
              path="/:market/ticker/:ticker/deep-insight/:x"
              element={<DeepInsightDetails />}
            />
            <Route path="/stock-market" element={<StockMarket />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

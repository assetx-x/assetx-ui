import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import TickerDetail from "./pages/tickerDetail/TickerDetail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PortfolioAnalysisResults from "./pages/stockMarketDetails/PortfolioAnalysisResults.jsx";
import PrivateRoute from "../src/routes/PrivateRoute";
import Market from "./pages/market/Market.jsx";
import PortfolioAnalysis from "./pages/stockMarketDetails/PortfolioAnalysis.jsx";
import AiDrivenInsights from "./pages/aiDrivenInsights/AIDrivenInsights.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/:market/ticker/:ticker" element={<TickerDetail />} />
          {/*TODO: stop using magic strings*/}
          <Route path="/:market/ai-driven-insights" element={<AiDrivenInsights />} />
          <Route path="/:market/portfolio-analysis" element={<PortfolioAnalysis  />} />
          <Route path="/:market/portfolio-analysis/:id"
                 element={<PortfolioAnalysisResults selected={"portfolio-analysis"} />}
          />
        </Route>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

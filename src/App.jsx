import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import TickerDetail from "./pages/tickerDetail/TickerDetail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PrivateRoute from "../src/routes/PrivateRoute";
import PortfolioAnalysis from "./pages/stockMarketDetails/PortfolioAnalysis.jsx";
import PortfolioAnalysisResultsContainer from "./pages/stockMarketDetails/PortfolioAnalysisResultsContainer.jsx";
import NewTickerDetial from "./pages/tickerDetail/NewTickerDetial.jsx";
// import AiDrivenInsights from "./pages/aiDrivenInsights/AIDrivenInsights.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/:market/ticker/:ticker" element={<NewTickerDetial />} />
          {/*TODO: stop using magic strings*/}
          {/*<Route path="/:market/ai-driven-insights" element={<AiDrivenInsights />} />*/}
          <Route path="/:market/portfolio-analysis" element={<PortfolioAnalysis  />} />
          <Route path="/:market/portfolio-analysis/:id"
                 element={<PortfolioAnalysisResultsContainer selected={"portfolio-analysis"} />}
          />
        </Route>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

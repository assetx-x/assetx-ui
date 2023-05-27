import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import PortfolioAnalysis from "./pages/stockMarketDetails/PortfolioAnalysis.jsx";
import TickerDetail from "./pages/tickerDetail/TickerDetail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PortfolioAnalysisResults from "./pages/stockMarketDetails/PortfolioAnalysisResults.jsx";
import PrivateRoute from "../src/routes/PrivateRoute"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route exact path='/' element={<PrivateRoute/>}>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/:market/ticker/:ticker" element={<TickerDetail />} />
          <Route path="/:market/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/:market/portfolio-analysis/:id" element={<PortfolioAnalysisResults />}
          />
        </Route>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

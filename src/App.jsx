import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import PortfolioAnalysis from "./pages/stockMarketDetails/PortfolioAnalysis.jsx";
import Detail from "./pages/detail/Detail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PortfolioAnalysisResults from "./pages/stockMarketDetails/PortfolioAnalysisResults.jsx";

function App() {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/details/:id" element={<Detail />} />
      <Route path="/:market/portfolio-analysis" element={<PortfolioAnalysis />} />
      <Route path="/:market/portfolio-analysis/:id" element={<PortfolioAnalysisResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;

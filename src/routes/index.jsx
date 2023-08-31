import PortfolioAnalysis from "../pages/stockMarketDetails/PortfolioAnalysis.jsx";
// import PortfolioAnalysisResults from "../pages/stockMarketDetails/PortfolioAnalysisResults.jsx";
import TickerDetail from "../pages/tickerDetail/TickerDetail.jsx";
import Login from "../pages/login/Login.jsx";
import Home from "../pages/home/Home.jsx";
import NewPortfolioAnalysisResults from "../pages/stockMarketDetails/NewPortfolioAnalysisResults.jsx";


const routes = [
  // Private Routes
  {
    path: '/:market/ticker/:ticker',
    component: TickerDetail,
    isPrivate: true,
  },
  {
    path: '/:market/portfolio-analysis',
    component: PortfolioAnalysis,
    isPrivate: true,
  },
  {
    path: '/:market/portfolio-analysis/results',
    component: NewPortfolioAnalysisResults,
    isPrivate: true,
  },
  // Public Routes
  {
    path: '/',
    component: Home,
    isPrivate: false,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
];

export default routes;
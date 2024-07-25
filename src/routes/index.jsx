import PortfolioAnalysis from "../pages/stockMarketDetails/PortfolioAnalysis.jsx";
// import PortfolioAnalysisResults from "../pages/stockMarketDetails/PortfolioAnalysisResults.jsx";
import TickerDetail from "../pages/tickerDetail/TickerDetail.jsx";
import NewPortfolioAnalysisResults from "../pages/stockMarketDetails/NewPortfolioAnalysisResults.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login.jsx";
import Home from "../pages/home/Home.jsx";
import NewTickerDetail from "../pages/tickerDetail/NewTickerDetail.jsx";
import Market from "../pages/market/Market.jsx";
import PortfolioAnalysisResultsContainer from "../pages/stockMarketDetails/PortfolioAnalysisResultsContainer.jsx";
import DeepInsightDetails from "../pages/deepInsightDetail/DeepInsightDetails.jsx";
import Register from "../pages/register/Register.jsx";
import Holding from "../pages/holding/Holding.jsx";
import Strategies from "../pages/Strategies/index.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const routes = {
  // Private Routes
  private: [
    {
      path: "/:market/ticker/:ticker",
      component: NewTickerDetail,
    },
    {
      path: "/:market/portfolio-analysis/:id",
      component: PortfolioAnalysisResultsContainer,
      params : {
        selected: "portfolio-analysis"
      }
    },
    {
      path: "/:market",
      component: Market,
    },
    {
      path: "/:market/ticker/:ticker/deep-insight/:x",
      component: DeepInsightDetails,
    },
  ],
  // Public Routes
  public: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/holding",
      component: Holding,
    },
    {
      path: "/strategies",
      component: Strategies,
    },
  ]
};

const genRoutes = (routesArray) => {
  return routesArray.map((route, index) => {
    const { path, component: Component, params } = route;
    return (
      <Route
        key={index}
        path={path}
        element={<Component {...params} />}
      />
    );
  });
};

const AppRouter = () => {
  return (
    // <Router>
      <Routes>
        {genRoutes(routes.public)}

        <Route element = {<PrivateRoute />}>
          {genRoutes(routes.private)}
        </Route>
      </Routes>
    // </Router>
  )
}
export default AppRouter;

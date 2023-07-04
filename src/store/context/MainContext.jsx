import React, { useContext, useState } from "react";

const MainContext = React.createContext();

function MainProvider(props) {
  const [predictionData, setPredictionData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRatingData, setSelectedRatingData] = useState('composite');


  return (
    <MainContext.Provider
      value={{
        predictionData,
        setPredictionData,
        selectedRatingData,
        setSelectedRatingData,
        selectedTab,
        setSelectedTab
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
const useMain = () => useContext(MainContext)


export { MainProvider, useMain };

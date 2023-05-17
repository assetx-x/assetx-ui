import React, { useState } from "react";

const MainContext = React.createContext();

function MainProvider(props) {
  const [predictionData, setPredictionData] = useState([]);
  const [selectedRatingData, setSelectedRatingData] = useState('composite');


  return (
    <MainContext.Provider
      value={{
        predictionData,
        setPredictionData,
        selectedRatingData,
        setSelectedRatingData
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainProvider, MainContext };

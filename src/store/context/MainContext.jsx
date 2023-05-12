import React, { useState } from "react";

const MainContext = React.createContext();

function MainProvider(props) {
  const [predictionData, setPredictionData] = useState([]);


  return (
    <MainContext.Provider
      value={{
        predictionData,
        setPredictionData
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainProvider, MainContext };

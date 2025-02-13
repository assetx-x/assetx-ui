import React from "react";
import Plot from "react-plotly.js";

export function BoxPlot({data, placeholderData}) {

  let layout = {
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: {
      showgrid: false
    },
    yaxis: {
      showgrid: false
    },
    showlegend: false,
    font: {
      family: "NunitoSans-ExtraBold",
      color: "#1E8FCC"
    },
    yaxis: {
      title: "(%) Drawdown",
      zeroline: false
    },
    height: 500,
    width: 500,
  };

  return <Plot data={data} style={{ width: "100%" }} layout={layout} />;
}

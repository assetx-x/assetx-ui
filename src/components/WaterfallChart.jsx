import React from "react";
import Plot from "react-plotly.js";


export function WaterfallChart({ data }) {

  const layout = {

    plot_bgcolor: "rgba(0,0,0,0)",
    autosize: true,
    showlegend: false,
    xaxis: {
      showgrid: false
    },
    yaxis: {
      title: "<b>(β)</b> Relative Factor Contribution",
      showgrid: false
    },


    showlegend: false,
    font: {
      family: "NunitoSans-ExtraBold",
      color: "#537FA0"
    }

  };

  return <Plot data={data} style={{ width: "100%" }} layout={layout} />;
}

import React, { useEffect } from "react";
import Plot from "react-plotly.js";

function ConditionalFactor({
  data,
  terminal_date,
  layoutParameters = {},
  yaxisLabel = "<b>β</b> Factor Exposure",
}) {
  useEffect(() => {}, [data]);

  var trace1 = {
    x: data?.AssetX?.y,
    y: data?.AssetX?.x,
    line: { width: 0 },
    marker: { color: "444" },
    mode: "lines",
    name: "Lower Bound",
    type: "scatter",
    showlegend: false,
  };

  var trace2 = {
    x: data?.["Your Portfolio"]?.y,
    y: data?.["Your Portfolio"]?.x,
    fillcolor: "rgba(226, 226, 226,0.7)",
    line: { color: "#537FA0" },
    mode: "lines",
    name: "Your Portfolio",
    type: "scatter",
  };

  var trace3 = {
    x: data?.["Your Portfolio"]?.y,
    y: data?.["Your Portfolio"]?.x,
    fill: "tonexty",
    fillcolor: "rgba(226, 226, 226,0.7)",
    line: { width: 0 },
    marker: { color: "444" },
    mode: "lines",
    name: "Upper Bound",
    type: "scatter",
    showlegend: false,
  };

  var trace4 = {
    x: data?.AssetX?.y,
    y: data?.AssetX?.x,
    line: { color: "#537FA0", dash: "dot" },
    mode: "lines",
    name: "AssetX",
    type: "scatter",
  };

  let finalData = [trace2, trace4];
  let layout = {
    yaxis: {
      title: yaxisLabel,
    },
    plot_bgcolor: "rgba(0,0,0,0)",

    legend: { orientation: "h" },
    font: {
      family: "NunitoSans-ExtraBold",
      color: "#537FA0",
    },
    shapes: [
      {
        type: "line",
        x0: terminal_date,
        y0: 0,
        x1: terminal_date,
        y1: 1,
        yref: "paper", // This ensures the line spans the entire y-axis
        line: {
          color: "red",
          width: 2,
          dash: "dot",
        },
      },
    ],
    height: 500,
    ...layoutParameters,
  };

  return <Plot data={finalData} style={{ width: "100%" }} layout={layout} />;
}

export default ConditionalFactor;
